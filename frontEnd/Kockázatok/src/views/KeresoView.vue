<template>
  <div class="view">
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-col w-full lg:w-1/2">
        <h1>Kereső</h1>
        <label for="tev">Tevékenység:</label>
        <select id="tev" v-model="selectedTev" @change="onTevChange">
          <option v-for="tev in uniqueTevs" :key="tev.tevid" :value="tev.tevid">
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
            :class="{
              'bg-white-to-lightblue': activeClass && item === selectedKockazat,
            }"
            @click="selectKockazat(item)"
          >
            <div class="basis-4/12">{{ item.kockcsop }}</div>
            <div class="h-full min-h-4 w-[2px] bg-blue-800"></div>
            <div class="basis-8/12">{{ item.nev }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-row lg:flex-col w-full lg:w-1/2">
        <div v-if="selectedKockazat" class="mt-4 p-4">
          <h2 class="text-xl font-bold">{{ selectedKockazat.nev }}</h2>
          <div v-if="selectedKockazat" class="mt-4">
            <button
              @click="addToLeltar"
              :disabled="isAdded"
              class="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {{ isAdded ? "Hozzáadva" : "Hozzáadom a leltárhoz" }}
            </button>
            <div v-if="bodyContent" class="mt-4">
              <h3 class="text-lg font-semibold">Küldendő adatok:</h3>
              <pre>{{ bodyContent }}</pre>
            </div>
          </div>

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
import VueJwtDecode from 'vue-jwt-decode';

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
      isAdded: false,
      bodyContent: '',
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
    async addToLeltar() {
      if (!this.selectedKockazat) return;

      const body = {
        userId: this.getCurrentUserId(),
        kockcsop: this.selectedKockazat.kockcsop,
        nev: this.selectedKockazat.nev,
        ok: this.selectedKockazat.ok,
        kov: this.selectedKockazat.kov,
        kontr: this.selectedKockazat.kontr,
        tevid: this.selectedKockazat.tevid,
        fcsopid: this.selectedKockazat.fcsopid,
        folyid: this.selectedKockazat.folyid,
      };

      this.bodyContent = JSON.stringify(body, null, 2); // Formázott JSON string

      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/leltar`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result.id) {
          this.isAdded = true;
        }
      } catch (error) {
        console.error("Error adding to leltar:", error);
      }
      
    },
    
    getCurrentUserId() {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = VueJwtDecode.decode(token)
        return decoded.userId; // Token struktúrájától függően a megfelelő mező
      }
      return null; // Vagy valamilyen alapértelmezett érték, ha nincs token
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
