<template>
  <div class="flex flex-col lg:flex-row container items-center w-full max-w-screen-2xl columns-2 mb-20 gap-8 bg-blue-400 px-4 xl:px-20 rounded-lg">
    <div class="w-full my-5 lg:-my-5">
      <h2 class="pb-6">Mi a kockázatok.hu?</h2>
      <p>
        Integrált kockázatkezelési rendszer működtetése széles körben jogszabályi kötelezettség. A kockazatok.hu webappal azonban érték alapon közelítjük meg a kérdést: a megfelelően működő kockázatmenedzsment tevékenység a bizonytalanság csökkentésével segíti a szervezeteket céljaik elérésében.
        <br /><br />
        A kockzatok.hu webappot az ETK Szolgáltató zRt. sokéves tanácsadói tapasztalataira támaszkodva építettük fel.
        <br /><br />
        A webappon elérhető szakmai anyagok további segítséget nyújtanak az integrált kockázatkezelési rendszer kialakításában, fejlesztésében, a kockázattudatosság erősítésében.
      </p>
    </div>
    <div class="w-full my-5 lg:-my-5">
      <h3 class="text-xl font-bold mb-6 px-6 py-3 bg-white border border-blue-500 rounded-md drop-shadow-[7px_5px_0_#D4ECFF]">
        A kockazatok.hu szolgáltatás támogatást nyújt:
      </h3>
      <ol class="list-decimal list-inside flex flex-col gap-y-6">
        <li v-for="(item, index) in listItems" :key="index" class="px-6 py-3 bg-white border border-blue-500 rounded-md drop-shadow-[7px_5px_0_#D4ECFF]">
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailsSection',
  data() {
    return {
      listItems: [
        "A szervezet kockázatainak teljeskörű felméréséhez, számbavételéhez",
        "A kockázatok megértéséhez, szakszerű leírásához",
        "A kockázatok értékeléséhez a kiváltó okok, fenyegetések beazonosításával",
        "A szervezetnél működő kontrollok áttekintéséhez",
        "A kockázatok kézbentartásához szükséges intézkedések megtervezéséhez"
      ]
    };
  }
};
</script>
