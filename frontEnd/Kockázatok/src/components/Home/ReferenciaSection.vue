<template>
  <div id="referenciak" class="container 2xl:max-w-screen-xl mb-36 px-4 lg:px-2">
    <h2 class="text-center pb-6 mt-6 mb-6">Referenciáinkból</h2>
    <div class="flex flex-wrap">
      <div 
        v-for="(item, index) in contentData" 
        :key="index" 
        class="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-6 lg:w-1/2 lg:odd:pr-5 lg:even:pl-5"
      >
        <div class="max-w-[68px] lg:max-w-[84px] flex justify-center items-center lg:object-contain overflow-hidden">
          <img 
            :src="item.src"
            :width="item.width"
            :height="item.height"
            alt="partner logó"
          />
        </div>
        <div class="border-b-[7px] lg:border-l-[7px] lg:border-b-0 border-blue-500 pl-7 pb-8 lg:pb-0">
          <h4 class="text-lg font-bold mb-2">{{ item.title }}</h4>
          <p class="blue-600">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentData: [
        {
          src: "/img/ref/edv.png",
          title: "Északdunántúli Vízmű Zrt.",
          description: "Kockázatkezelési rendszer kialakítása, megfelelési tanácsadói tevékenység ellátása.",
          width: "128",
          height: "128",
        },
        {
          src: "/img/ref/emi.png",
          title: "ÉMI Nonprofit Kft.",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/nhkv.png",
          title: "NHKV Zrt.",
          description: "kockázatkezelési rendszer kialakítása, kockázatkezelési tanácsadás",
          width: "155",
          height: "84",
        },
        {
          src: "/img/ref/stu.svg",
          title: "STU Repülés-technológiai Felületkezelő Kft.",
          description: "Megfelelést támogató szervezet kialakítása, megfelelési tanácsadói tevékenység ellátása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/babszinhaz.png",
          title: "Budapest Bábszínház Nonprofit Kft.",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/tempus.png",
          title: "Tempus Közalapítvány",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/omszi.png",
          title: "OMSZI Intézményfenntartó Nonprofit Kft.",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/bpzoo.png",
          title: "Fővárosi Állat- és Növénykert",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/kecskemet.png",
          title: "Kecskeméti Városüzemeltetési Nonprofit Kft.",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/nhsz.png",
          title: "NHSZ Nemzeti Hulladékgazdálkodási Szolgáltató Kft.",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/komlo.png",
          title: "Komlói Fűtőerőmű Kft.",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        },
        {
          src: "/img/ref/terc.png",
          title: "Terc Kft.",
          description: "Kockázatkezelési rendszer kialakítása, megfelelést támogató szervezet kialakítása",
          width: "154",
          height: "88",
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
