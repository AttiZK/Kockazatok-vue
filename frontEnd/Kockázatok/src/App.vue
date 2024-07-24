<script setup>
import headerSection from './components/HeaderSection.vue'
import { provide } from 'vue';

</script>

<template>

<headerSection />
  <main id="rolam" class="flex flex-col pt-[75px] w-full px-4 xl:px-8 3xl:px-16">
      <RouterView />
  </main>
</template>
