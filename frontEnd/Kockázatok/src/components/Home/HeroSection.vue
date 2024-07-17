<template>
  <div
    id="hero-section"
    class="flex flex-col items-center justify-between gap-y-10 container mb-36"
  >
    <div
      class="container absolute max-w-screen-2xl min-h-600 rounded-b-md -z-10 px-2 lg:px-0"
    ></div>
    <h1 class="mt-36 text-4xl lg:text-5xl text-blue-800 font-black">Kockázatok.hu</h1>
    <p class="font-serif text-blue-800 text-center">
      Folyamatalapú kockázati tudásbázis, melyből összeállíthatja saját kockázati leltárát.
    </p>
    <div class="flex flex-col md:flex-row gap-x-10 gap-y-5">
      <btnPrimary text="Fizessen elő a webappra" />
      <router-link to="#reszletek">
        <button
          class="flex items-center gap-4 justify-center border border-blue-600 text-blue-600 font-bold hover:brightness-110 py-2 px-11 rounded"
        >
          Részletek
          <svg width="25" height="21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.469 2.63a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1Zm0 8a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2h-14a1 1 0 0 1-1-1Zm0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1ZM3.995.28a1 1 0 0 1 .474.85v7a1 1 0 1 1-2 0V2.748l-.553.276a1 1 0 1 1-.894-1.789l2-1a1 1 0 0 1 .973.044Zm-.71 13.332a.75.75 0 0 0-.751.467 1 1 0 0 1-1.855-.748 2.749 2.749 0 1 1 4.79 2.623L3.468 18.63H4.97a1 1 0 1 1 0 2h-3.5a1 1 0 0 1-.8-1.6l3.186-4.256a.75.75 0 0 0-.57-1.162Z"
              fill="#649ED8"
            />
          </svg>
        </button>
      </router-link>
    </div>
    <div class="relative flex place-items-center">
      <div class="relative border border-blue-500 rounded max-w-3xl">
        <img
          class="relative rounded-md drop-shadow-[7px_5px_0_#D4ECFF]"
          src="/img/hero.png"
          alt="Kockázatok.hu"
          width="1512"
          height="1073"
          priority
        />
        <svg
          class="absolute hidden lg:block right-[-55px] bottom-[-45px]"
          width="73"
          height="72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m3.885 7.497 22.244 59.317a3.057 3.057 0 0 0 5.733-.038l8.905-24.5a3.097 3.097 0 0 1 1.834-1.834l24.5-8.905a3.058 3.058 0 0 0 .038-5.733L7.82 3.56a3.058 3.058 0 0 0-3.936 3.937v0Z"
            fill="#fff"
            stroke="#000"
            stroke-width="2.417"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="m8.895.697 59.327 22.248a6.116 6.116 0 0 1-.077 11.465L43.66 43.311l-.014.009-.009.013-8.9 24.487a6.116 6.116 0 0 1-11.467.077l-.003-.01L1.022 8.57A6.116 6.116 0 0 1 8.895.697ZM6.748 6.423l22.24 59.308 8.905-24.499.005-.012a6.154 6.154 0 0 1 3.646-3.647l.013-.005 24.499-8.905L6.748 6.423Z"
            fill="#D4ECFF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M39.331 39.008a3.058 3.058 0 0 1 4.324 0l27.29 27.289a3.058 3.058 0 1 1-4.325 4.324L39.331 43.332a3.058 3.058 0 0 1 0-4.324Z"
            fill="#D4ECFF"
          />
        </svg>
      </div>
    </div>
    <div id="reszletek"></div>
  </div>
</template>

<script>
import btnPrimary from '@/components/btnPrimary.vue'

export default {
  name: 'HeroSection',
  components: {
    btnPrimary
  }
}
</script>

<style scoped>
/* Adj hozzá stílusokat, ha szükséges */
</style>
