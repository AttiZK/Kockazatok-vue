<template>
  <div id="usage" class="mb-36 w-full bg-cover bg-no-repeat bg-top">
    <div class="container max-w-screen-xl mx-auto px-4 lg:px-2">
      <h2 class="pb-16 mt-20 lg:mt-32">Így néz ki használat közben!</h2>
      <div id="usage-chart" class="mb-32 flex flex-col lg:flex-row">
        <div class="w-full min-w-lg max-w-[756px] border border-blue-600 rounded-md h-min overflow-hidden">
          <img src="/img/usage-topbar.svg" alt="így működik" class="w-full"/>
          <img src="/img/hero.png" alt="így működik" class="w-full"/>
        </div>
        <div class="lg:w-full max-w-lg">
          <AccordionCont />
        </div>
      </div>
      <h2 class="text-center pb-6 mt-6">A kockázatok.hu szolgáltatásai</h2>
      <div class="max-w-screen-lg mx-auto flex flex-col p-12 justify-center items-center bg-blue-400 rounded-lg mb-20 drop-shadow-[7px_5px_0_#D4ECFF]">
        <ul class="list-image-checkmark list-outside flex flex-col py-2">
          <li v-for="(item, index) in promoItems" :key="index" class="px-6 py-3">
            {{ item }}
          </li>
        </ul>
        <h3 class="text-xl text-center font-semibold">A kockázatok.hu webapp előfizetése 120.000Ft + áfa</h3>
        <div class="w-1/4 h-auto border-b-2 border-blue-800 my-2"></div>
        <span class="text-xl text-center font-bold mb-8">12 hónap</span>
        <btnPrimary text="Fizessen elő a webappra"/>
      </div>
      <h4 class="text-xl lg:text-2xl text-center font-semibold">
        Külön megállapodott díjazás mellett vállaljuk
      </h4>
      <div class="container columns-1 lg:columns-4 mt-14">
        <div class="border-dashed border-b-2 lg:border-r-2 lg:border-b-0 border-blue-500 pr-4 pb-8 mb-8 lg:mb-0 flex flex-col items-center lg:block">
          <svg class="mb-6 inline" width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 5.332a4.5 4.5 0 1 0-5.5 4.388v.112a2 2 0 0 1-2 2h-9a4.026 4.026 0 0 0-2 .537V9.72a4.5 4.5 0 1 0-2 0v6.226a4.5 4.5 0 1 0 2 0v-.113a2 2 0 0 1 2-2h9a4.013 4.013 0 0 0 4-4V9.72A4.512 4.512 0 0 0 24 5.332Zm-22 0a2.5 2.5 0 1 1 2.5 2.5 2.513 2.513 0 0 1-2.5-2.5Zm5 15a2.5 2.5 0 1 1-2.5-2.5 2.512 2.512 0 0 1 2.5 2.5Z" fill="#1B3266"/></svg>
          <p>Integrált kockázatkezelési rendszerek kialakítása, szabályozó környezet megteremtése egyedi sajátosságok szerint. Kockázati leltár elkészítése, értékelő rendszer kialakítása.</p>
        </div>
        <div class="border-dashed border-b-2 lg:border-r-2 lg:border-b-0 border-blue-500 pr-4 pb-8 mb-8 lg:mb-0 flex flex-col items-center lg:block">
          <svg class="mb-6 inline" width="30" height="26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 21.546c.618-.27 1.215-.587 1.785-.948v4.341a.893.893 0 0 1-1.785 0v-3.393ZM14.244 8.443a.915.915 0 0 0 .368 1.217l5.223 2.779 1.898-1.016-6.273-3.348a.915.915 0 0 0-1.216.368Zm14.61-.368L15.46.932a.949.949 0 0 0-.848 0L1.219 8.075a.904.904 0 0 0 0 1.585l2.656 1.406v5.558a1.73 1.73 0 0 0 .357 1.06c.882 1.184 4.275 5.023 10.804 5.023a14.365 14.365 0 0 0 5.804-1.172v-8.56l-1.005-.536-4.799 2.556-9.844-5.246-1.652-.882L15.036 2.74l11.496 6.127-1.652.882-3.147 1.674.424.224a.937.937 0 0 1 .357.368.838.838 0 0 1 .111.424v8.159a12.48 12.48 0 0 0 3.215-2.913 1.73 1.73 0 0 0 .357-1.06v-5.559l2.656-1.406a.904.904 0 0 0 0-1.585Z" fill="#1B3266"/></svg>
          <p>Kihelyezett oktatások megszervezése egyedi igények szerint. Vezetői tréning, munkavállalói tréning. Jó gyakorlatok bemutatása, csoportos feladatmegoldások.</p>
        </div>
        <div class="border-dashed border-b-2 lg:border-r-2 lg:border-b-0 border-blue-500 pr-4 pb-8 mb-8 lg:mb-0 flex flex-col items-center lg:block">
          <svg class="mb-6 inline" width="27" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.5 4.832h-5v-1a3.013 3.013 0 0 0-3-3h-6a3.013 3.013 0 0 0-3 3v1h-5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2v-16a2 2 0 0 0-2-2Zm-15-1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1h-8v-1Zm15 3v9h-22v-9h22Z" fill="#1B3266"/></svg>
          <p>Workshopok szervezése, moderálása a kockázatok azonosításának, értékelésének, a kockázatkezelési intézkedések tervezésének támogatására.</p>
        </div>
        <div class="pr-4 pb-8 mb-8 lg:mb-0 flex flex-col items-center lg:block">
          <svg class="mb-6 inline" width="27" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.25.832h-22a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2v-18a2 2 0 0 0-2-2Zm-18.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#1B3266"/></svg>
          <p>Integrált kockázatkezelési rendszerek fejlesztése, működő rendszerek felülvizsgálata, értékelése. Fejlesztési javaslatok megfogalmazása, a megvalósítás támogatása.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionCont from '@/components/Home/AccordionCont.vue';
import btnPrimary from '@/components/btnPrimary.vue';

export default {
  components: {
    AccordionCont,
    btnPrimary,
  },
  data() {
    return {
      promoItems: [
        "400+ lehetséges kockázatot mutatunk be részletesen, folyamatszemléletben",
        "Lehetséges kontrollok és kockázatkezelési intézkedésekre adunk javaslatot",
        "Évente 2 kockázatokkal és kontrollokkal foglalkozó, online tananyagot készítünk",
        "Hírlevelünkben bemutatjuk a legújabb tartalmainkat",
        "Szabályzatmintákat, szakanyagokat publikálunk az Ön tájékoztatására",
        "Leveleit megválaszoljuk minden szakértelmünkkel",
      ]
    };
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
