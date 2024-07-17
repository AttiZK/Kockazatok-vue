<template>
  <div class="accordion group w-auto lg:max-w-lg">
    <div v-for="item in data" :key="item.id">
      <AccordionUI
        :title="item.question"
        :id="item.id"
        :content="item.answer"
        :index="index"
        @setIndex="setIndex"
      />
      <div v-if="item.id !== data.length" class="last:hidden border-b border-dotted border-blue-600 my-8"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import AccordionUI from './AccordionUI.vue';

export default {
  components: {
    AccordionUI
  },
  setup() {
    const index = ref(1); // Set the initial value of index to 1 for the first accordion element
    const data = [
      {
        id: 1,
        question: "Keresés és szűrés",
        answer: "Kereshet és szűrhet a népszerű táblázatkezelő szoftverek logikája mentén.",
      },
      {
        id: 2,
        question: "Leltározás",
        answer: "Kereshet és szűrhet a népszerű táblázatkezelő szoftverek logikája mentén.",
      },
      {
        id: 3,
        question: "Exportálás",
        answer: "Kereshet és szűrhet a népszerű táblázatkezelő szoftverek logikája mentén.",
      },
    ];

    const setIndex = (newIndex) => {
      index.value = newIndex;
    };

    return {
      data,
      index,
      setIndex
    };
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
