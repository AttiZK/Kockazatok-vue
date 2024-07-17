<script setup>
import headerSection from './components/HeaderSection.vue'
</script>

<template>

<headerSection />
  <main id="rolam" class="flex flex-col pt-[75px] w-full">
      <RouterView />
  </main>
</template>
