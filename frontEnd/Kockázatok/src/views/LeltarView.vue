<template>
  <div>
    <h1 class="mt-8 mb-2">Kockázati leltár</h1>
    <div class="border border-blue-400 rounded-md shadow-base mb-20">
      <div
        class="grid grid-cols-[18fr_16px_25fr_16px_28fr_16px_28fr_16px_28fr] px-[6px] items-center pt-6 pb-3">
        <span class="t-head">Folyamat</span>
        <div class="min-h-5 justify-self-center w-[1px] bg-blue-700"></div>
        <span class="t-head">A kockázat megnevezése</span>
        <div class="min-h-5 justify-self-center w-[1px] bg-blue-700"></div>
        <span class="t-head">Kiváltó ok</span>
        <div class="min-h-5 justify-self-center w-[1px] bg-blue-700"></div>
        <span class="t-head">Lehetséges következmények</span>
        <div class="min-h-5 justify-self-center w-[1px] bg-blue-700"></div>
        <span class="t-head">Kontrolltevékenységek</span>
      </div>
      <div v-if="data.length > 0">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="mb-5 last:mb-0 border border-blue-600 hover:border-blue-900 rounded-md group">
          <div
            class="grid grid-cols-[18fr_16px_25fr_16px_28fr_16px_28fr_16px_28fr] p-[6px] items-center font-sans">
            <span class="h-fit text-sm">{{ item.folyid }}</span>
            <div class="min-h-5 h-full justify-self-center w-[1px] bg-blue-600"></div>
            <span class="h-fit text-sm">{{ item.nev }}</span>
            <div class="min-h-5 h-full justify-self-center w-[1px] bg-blue-600"></div>
            <span class="h-fit text-sm">{{ item.ok }}</span>
            <div class="min-h-5 h-full justify-self-center w-[1px] bg-blue-600"></div>
            <span class="h-fit text-sm">{{ item.kov }}</span>
            <div class="min-h-5 h-full justify-self-center w-[1px] bg-blue-600"></div>
            <span class="h-fit text-sm">{{ item.kontr }}</span>
          </div>
          <div
            class="flex gap-2 px-3 py-1 border-t-[1px] border-blue-600 group-hover:border-blue-900 w-full">
            <span class="text-sm text-blue-600">Tevékenység:{{ item.tevid }}</span>
            <span class="text-sm text-blue-600">/</span>
            <span class="text-sm text-blue-600">Folyamatcsoport:{{ item.fcsopid }}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Nincsenek elérhető bejegyzések.</p>
      </div>
    </div>
    <footer>
      <RouterLink to="/kereso">
      <div class="footer-link">
        <img src="/img/arrow-boxed.svg" width="24px" height="24px" />
        <span class="text-blue-600 font-medium">Továbbkeresés</span>
      </div>
    </RouterLink>
    <RouterLink to="/ertekeles">
      <div class="footer-link">
        <span class="text-blue-600 font-medium">Értékelés</span>
        <img src="/img/arrow-boxed.svg" class="rotate-180" width="24px" height="24px" />
      </div>
    </RouterLink>
    </footer>
  </div>
</template>

<script>
  import VueJwtDecode from "vue-jwt-decode";

  export default {
    data() {
      return {
        data: [], // Az adatokat itt tároljuk
      };
    },
    methods: {
      getCurrentUserId() {
        // Token dekódolása és felhasználói ID kinyerése
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = VueJwtDecode.decode(token);
          return decoded.userId; // Token struktúrájától függően a megfelelő mező
        }
        return null; // Ha nincs token, alapértelmezett érték
      },
      async fetchData() {
        // Adatok lekérése az API-ból
        try {
          const userId = this.getCurrentUserId();
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_BASE_URL}/leltar?userid=${userId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          this.data = await response.json();
          console.log("Fetched Data:", this.data); // Adatok ellenőrzése
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
    },
    mounted() {
      // Oldal betöltődésekor adatokat lekérjük
      this.fetchData();
    },
  };
</script>

<style scoped>
  /* Stílusok az oldalhoz */
</style>
