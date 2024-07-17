<template>
  <div class="view">
    <h1>Kereső</h1>
    <!-- A lenyíló menük ugyanazok maradnak -->
    <div>
      <label for="tev">Tevékenység:</label>
      <select id="tev" v-model="selectedTev" @change="onTevChange">
        <option v-for="tev in uniqueTevs" :key="tev.tevid" :value="tev.tevid">{{ tev.tev }}</option>
      </select>
    </div>
    <div>
      <label for="fcsop">Folyamatcsoport:</label>
      <select id="fcsop" v-model="selectedFcsop" @change="onFcsopChange" :disabled="!selectedTev">
        <option v-for="fcsop in uniqueFcsops" :key="fcsop.fcsopid" :value="fcsop.fcsopid">{{ fcsop.fcsop }}</option>
      </select>
    </div>
    <div>
      <label for="foly">Folyamat:</label>
      <select id="foly" v-model="selectedFoly" @change="onFolyChange" :disabled="!selectedFcsop">
        <option v-for="foly in uniqueFolys" :key="foly.folyid" :value="foly.folyid">{{ foly.foly }}</option>
      </select>
    </div>
    <!-- Csak akkor jelenítjük meg a táblázatot, ha vannak keresési eredmények -->
    <table v-if="data.length > 0">
      <thead>
        <tr>
          <th>Tev</th>
          <th>Fcsop</th>
          <th>Foly</th>
          <th>ExcelId</th>
          <th>Név</th>
          <th>Kiváltó ok</th>
          <th>Lehetséges következmények</th>
          <th>Kontrollok</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.tevid }}</td>
          <td>{{ item.fcsopid }}</td>
          <td>{{ item.folyid }}</td>
          <td>{{ item.excelid }}</td>
          <td>{{ item.nev }}</td>
          <td>{{ item.ok }}</td>
          <td>{{ item.kov }}</td>
          <td>{{ item.kontr }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tevs: [],
      selectedTev: null,
      selectedFcsop: null,
      selectedFoly: null,
      data: []
    };
  },
  computed: {
    uniqueTevs() {
      const unique = [];
      const map = new Map();
      for (const item of this.tevs) {
        if (!map.has(item.tevid)) {
          map.set(item.tevid, true);
          unique.push({
            tevid: item.tevid,
            tev: item.tev
          });
        }
      }
      return unique;
    },
    uniqueFcsops() {
      const unique = [];
      const map = new Map();
      for (const item of this.tevs) {
        if (item.tevid === this.selectedTev && !map.has(item.fcsopid)) {
          map.set(item.fcsopid, true);
          unique.push({
            fcsopid: item.fcsopid,
            fcsop: item.fcsop
          });
        }
      }
      return unique;
    },
    uniqueFolys() {
      const unique = [];
      const map = new Map();
      for (const item of this.tevs) {
        if (item.tevid === this.selectedTev && item.fcsopid === this.selectedFcsop && !map.has(item.folyid)) {
          map.set(item.folyid, true);
          unique.push({
            folyid: item.folyid,
            foly: item.foly
          });
        }
      }
      return unique;
    }
  },
  methods: {
    async fetchTevs() {
        try {
            const response = await fetch('http://localhost:3000/folyamat');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.tevs = await response.json();
        } catch (error) {
            console.error('Error fetching tevs:', error);
        }
    },
    async fetchData() {
        if (!this.selectedTev || !this.selectedFcsop || !this.selectedFoly) return; // Csak akkor kér adatot, ha mindhárom lenyílóban van kiválasztott érték
        try {
            const response = await fetch(`http://localhost:3000/kockazatok?tevid=${this.selectedTev}&fcsopid=${this.selectedFcsop}&folyid=${this.selectedFoly}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.data = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    onTevChange() {
        this.selectedFcsop = null;
        this.selectedFoly = null;
        this.data = []; // Töröljük a korábbi keresési eredményeket
    },
    onFcsopChange() {
        this.selectedFoly = null;
        this.data = []; // Töröljük a korábbi keresési eredményeket
    },
    onFolyChange() {
        this.fetchData(); // Csak akkor kér adatot, ha van kiválasztott folyamat
    }
},
mounted() {
    this.fetchTevs();
}
};
</script>

<style scoped>
/* Add your custom styles here */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
