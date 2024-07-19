<template>
  <div class="view">
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-col w-full lg:w-1/2">
        <h1>Kereső</h1>
          <label for="tev">Tevékenység:</label>
          <select id="tev" v-model="selectedTev" @change="onTevChange">
            <option
              v-for="tev in uniqueTevs"
              :key="tev.tevid"
              :value="tev.tevid"
            >
              {{ tev.tev }}
            </option>
          </select>
        <div>
          <label for="fcsop">Folyamatcsoport:</label>
          <select
            id="fcsop"
            v-model="selectedFcsop"
            @change="onFcsopChange"
            :disabled="!selectedTev"
          >
            <option
              v-for="fcsop in uniqueFcsops"
              :key="fcsop.fcsopid"
              :value="fcsop.fcsopid"
            >
              {{ fcsop.fcsop }}
            </option>
          </select>
        </div>
        <div>
          <label for="foly">Folyamat:</label>
          <select
            id="foly"
            v-model="selectedFoly"
            @change="onFolyChange"
            :disabled="!selectedFcsop"
          >
            <option
              v-for="foly in uniqueFolys"
              :key="foly.folyid"
              :value="foly.folyid"
            >
              {{ foly.foly }}
            </option>
          </select>
        </div>
        <!-- Csak akkor jelenítjük meg a táblázatot, ha vannak keresési eredmények -->
        <div
          v-if="data.length > 0"
          id="RG_kereso_eredmenyek"
          class="flex flex-col gap-[1rem]"
        >
          <div
            v-for="(item, index) in data"
            :key="index"
            class="flex border border-blue-600 hover:border-blue-900 justify-between rounded-md p-3 pt-4 gap-4 items-center cursor-pointer"
            :class="{ 'bg-white-to-lightblue': activeClass && item === selectedKockazat }"
            @click="selectKockazat(item)"
          >
            <div class="basis-4/12">{{ item.kockcsop }}</div>
            <div class="h-full min-h-4 w-[2px] bg-blue-800"></div>
            <div class="basis-8/12">{{ item.nev }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-row lg:flex-col w-full lg:w-1/2">
        <div
          v-if="selectedKockazat"
          class="mt-4 p-4"
        >
          <h2 class="text-xl font-bold">{{ selectedKockazat.nev }}</h2>
          <p><strong>Tevékenység:</strong> {{ selectedKockazat.tevid }}</p>
          <p>
            <strong>Folyamatcsoport:</strong> {{ selectedKockazat.fcsopid }}
          </p>
          <p><strong>Folyamat:</strong> {{ selectedKockazat.folyid }}</p>
          <p>
            <strong>Kockázatcsoport:</strong> {{ selectedKockazat.kockcsop }}
          </p>
          <p><strong>Kockázat:</strong> {{ selectedKockazat.nev }}</p>
          <p><strong>Ok:</strong> {{ selectedKockazat.ok }}</p>
          <p><strong>Következmény:</strong> {{ selectedKockazat.kov }}</p>
          <p><strong>Kontraintézkedés:</strong> {{ selectedKockazat.kontr }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      tevs: [],
      selectedTev: null,
      selectedFcsop: null,
      selectedFoly: null,
      selectedKockazat: null,
      activeClass: false,
    };
  },
  computed: {
    uniqueTevs() {
      return this.tevs.reduce(
        (acc, item) => {
          // Használja a reduce-t az egyedi tevékenységek kinyerésére
          if (!acc.map[item.tevid]) {
            // Ellenőrzi, ha már van-e az eredményben
            acc.result.push({ tevid: item.tevid, tev: item.tev }); // Ha nincs, hozzáadja az eredményhez és megjelöli
            acc.map[item.tevid] = true;
          }
          return acc; // Visszaadja az akkumulátort
        },
        { result: [], map: {} },
      ).result; // Kezdőérték
    },
    uniqueFcsops() {
      return this.tevs
        .reduce(
          (acc, item) => {
            if (item.tevid === this.selectedTev && !acc.map[item.fcsopid]) {
              acc.result.push({ fcsopid: item.fcsopid, fcsop: item.fcsop });
              acc.map[item.fcsopid] = true;
            }
            return acc;
          },
          { result: [], map: {} },
        )
        .result.filter(() => this.selectedTev);
    },
    uniqueFolys() {
      return this.tevs.reduce(
        (acc, item) => {
          if (
            item.tevid === this.selectedTev &&
            item.fcsopid === this.selectedFcsop &&
            !acc.map[item.folyid]
          ) {
            acc.result.push({ folyid: item.folyid, foly: item.foly });
            acc.map[item.folyid] = true;
          }
          return acc;
        },
        { result: [], map: {} },
      ).result;
    },
  },
  methods: {
    async fetchTevs() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/folyamat`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.tevs = await response.json();
      } catch (error) {
        console.error("Error fetching tevs:", error);
      }
    },
    async fetchData() {
      if (!this.selectedTev || !this.selectedFcsop || !this.selectedFoly)
        return; // Csak akkor kér adatot, ha mindhárom lenyílóban van kiválasztott érték
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/kockazatok?tevid=${this.selectedTev}&fcsopid=${this.selectedFcsop}&folyid=${this.selectedFoly}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.data = await response.json();
        this.selectedKockazat = null; // Reset selected kockázat
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    selectKockazat(item) {
      this.activeClass = true; // Frissítjük az aktív osztály állapotát
      this.selectedKockazat = item; // Beállítja a kiválasztott kockázatot
    },
    onTevChange() {
      this.selectedFcsop = null;
      this.selectedFoly = null;
      this.data = []; // Töröljük a korábbi keresési eredményeket
      this.selectedKockazat = null; // Reset selected kockázat
    },
    onFcsopChange() {
      this.selectedFoly = null;
      this.data = []; // Töröljük a korábbi keresési eredményeket
      this.selectedKockazat = null; // Reset selected kockázat
    },
    onFolyChange() {
      this.fetchData(); // Csak akkor kér adatot, ha van kiválasztott folyamat
    },

    clearActiveClass() {
      setTimeout(() => {
        // Egy kicsit késleltetjük, hogy biztosan látható legyen a módosulás
        this.activeClass = false;
      }, 500);
    },
  },
  mounted() {
    this.fetchTevs();
  },
};
</script>
