<template>
  <div class="view">
    <div class="flex flex-col lg:flex-row gap-12">
      <div class="flex flex-col w-full lg:basis-7/12">
        <h1 class="mt-8 mb-2">Kereső</h1>
        <div class="flex flex-col gap-2 mb-4 ">
          <div class="flex gap-2 items-center">
            <label class="w-[156px] text-blue-700 font-bold" for="tev">Tevékenység:</label>
            <select
              class="border w-[calc(100%_-_148px)] py-[6px] pl-6 pr-4 rounded-md text-blue-700"
              id="tev"
              v-model="selectedTev"
              @change="onTevChange">
              <option v-for="tev in uniqueTevs" :key="tev.tevid" :value="tev.tevid">
                {{ tev.tev }}
              </option>
            </select>
          </div>
          <div class="flex gap-2 items-center">
            <label class="w-[156px] text-blue-700 font-bold" for="fcsop">Folyamatcsoport:</label>
            <select
              class="border w-[calc(100%_-_148px)] py-[6px] pl-6 pr-4 rounded-md text-blue-700"
              id="fcsop"
              v-model="selectedFcsop"
              @change="onFcsopChange"
              :disabled="!selectedTev">
              <option v-for="fcsop in uniqueFcsops" :key="fcsop.fcsopid" :value="fcsop.fcsopid">
                {{ fcsop.fcsop }}
              </option>
            </select>
          </div>
          <div class="flex gap-2 items-center">
            <label class="w-[156px] text-blue-700 font-bold" for="foly">Folyamat:</label>
            <select
              class="border w-[calc(100%_-_148px)] py-[6px] pl-6 pr-4 rounded-md text-blue-700"
              id="foly"
              v-model="selectedFoly"
              @change="onFolyChange"
              :disabled="!selectedFcsop">
              <option v-for="foly in uniqueFolys" :key="foly.folyid" :value="foly.folyid">
                {{ foly.foly }}
              </option>
            </select>
          </div>
        </div>
        <!-- Csak akkor jelenítjük meg a táblázatot, ha vannak keresési eredmények -->
         <div class="grid grid-cols-[3fr_16px_10fr] p-3 gap-4">
          <div class=" min-w-16 lg:min-w-48 text-[14px] text-blue-800 font-bold uppercase">Kockázatcsoport</div>
          <div class="h-full min-h-4 w-[1px] justify-self-center bg-blue-700"></div>
          <div class="text-[14px] text-blue-800 font-bold uppercase">A kockázat megnvezése</div>
         </div>
        <div v-if="data.length > 0" class="flex flex-col gap-[1rem]">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="grid grid-cols-[3fr_16px_10fr] border border-blue-600 hover:border-blue-900 justify-between rounded-md p-3 pt-4 gap-4 items-center cursor-pointer"
            :class="{
              'bg-white-to-lightblue': activeClass && item === selectedKockazat,
            }"
            @click="selectKockazat(item)">
            <div class=" min-w-16 lg:min-w-48">{{ item.kockcsop }}</div>
            <div class="h-full min-h-4 w-[1px] justify-self-center bg-blue-700"></div>
            <div class="">{{ item.nev }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-row lg:flex-col w-full lg:basis-5/12 bg-white shadow-soft">
        <div v-if="selectedKockazat" class="mt-4 p-4">
          <h2 class="text-xl font-bold">{{ selectedKockazat.nev }}</h2>
          <div v-if="selectedKockazat" class="mt-4">
            <button
              @click="addToLeltar"
              :disabled="isAdded"
              class="bg-blue-800 text-white mb-8 py-2 px-4 rounded">
              {{ isAdded ? "Hozzáadva" : "Hozzáadom a leltárhoz" }}
            </button>
          </div>
          <div class="kockazat-tulajdonsagok">
            <span class="cimke">Folyamatstruktúra</span>
            <div class="flex gap-4 mb-4">
              <p>{{ selectedKockazat.tevid }}</p>
              <p>{{ selectedKockazat.fcsopid }}</p>
              <p>{{ selectedKockazat.folyid }}</p>
            </div>

            <span class="cimke">A kockázat csoportja</span>
            <p class="mb-4">{{ selectedKockazat.kockcsop }}</p>
            <span class="cimke">A kiváltó ok </span>
            <p class="mb-4">{{ selectedKockazat.ok }}</p>
            <span class="cimke">Lehetséges övetkezmények</span>
            <p class="mb-4">{{ selectedKockazat.kov }}</p>
            <span class="cimke">Kontrolltevékenységek</span>
            <p class="mb-4">{{ selectedKockazat.kontr }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <RouterLink to="/start">
      <div class="footer-link">
        <img src="/img/arrow-boxed.svg" width="24px" height="24px" />
        <span class="text-blue-600 font-medium">Start</span>
      </div>
    </RouterLink>
    <RouterLink to="/leltar">
      <div class="footer-link">
        <span class="text-blue-600 font-medium">Leltár</span>
        <img src="/img/arrow-boxed.svg" class="rotate-180" width="24px" height="24px" />
      </div>
    </RouterLink>
  </footer>
</template>

<script>
  import VueJwtDecode from "vue-jwt-decode";
  import axios from "axios";

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
        bodyContent: "",
      };
    },

    methods: {
      async selectKockazat(item) {
        this.activeClass = true; // Frissítjük az aktív osztály állapotát
        this.selectedKockazat = item; // Beállítja a kiválasztott kockázatot
        await this.checkAndSetIsAdded();
      },
      async checkAndSetIsAdded() {
        const userIdToCheck = this.getCurrentUserId(); // A felhasználó userid-ja
        const excelIdToCheck = this.selectedKockazat.excelid; // A kiválasztott kockázat excelId-ja

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/check-excelid`,
            {
              params: {
                excelId: excelIdToCheck,
                userId: userIdToCheck,
              },
            }
          );
          console.log(this.getCurrentUserId());

          // Ellenőrizzük az egyes értékeket
          console.log("Response ExcelId:", response.data.excelId);
          console.log("Response UserId:", response.data.userId);
          console.log("Response Exists:", response.data.exists);
          console.log("Response Data:", response.data);

          if (response.data.exists) {
            this.isAdded = true; // Állítsd be a frontenden, hogy van találat
          } else {
            this.isAdded = false; // Állítsd be a frontenden, hogy nincs találat
          }
        } catch (error) {
          console.error("Error checking excelId:", error);
          // Opció: Állíts be egy hibakezelő állapotot, ha szükséges
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
          excelid: this.selectedKockazat.excelid,
        };

        this.bodyContent = JSON.stringify(body, null, 2); // Formázott JSON string

        fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/leltar`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); // Válasz JSON formátumban
          })
          .then((data) => {
            // Sikeres válasz kezelése
            this.isAdded = true;
          })
          .catch((error) => {
            // Hibakezelés
            console.error("Error adding to leltar:", error);
          });
      },

      async fetchTevs() {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/folyamat`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          this.tevs = await response.json();
        } catch (error) {
          console.error("Error fetching tevs:", error);
        }
      },
      async fetchData() {
        if (!this.selectedTev || !this.selectedFcsop || !this.selectedFoly) return; // Csak akkor kér adatot, ha mindhárom lenyílóban van kiválasztott érték
        try {
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_BASE_URL}/kockazatok?tevid=${this.selectedTev}&fcsopid=${this.selectedFcsop}&folyid=${this.selectedFoly}`
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

      getCurrentUserId() {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = VueJwtDecode.decode(token);
          return decoded.userId; // Token struktúrájától függően a megfelelő mező
        }
        return null; // Vagy valamilyen alapértelmezett érték, ha nincs token
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
          { result: [], map: {} }
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
            { result: [], map: {} }
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
          { result: [], map: {} }
        ).result;
      },
    },
    mounted() {
      this.fetchTevs();
    },
  };
</script>
