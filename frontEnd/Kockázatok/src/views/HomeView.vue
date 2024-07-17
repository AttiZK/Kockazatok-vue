<template>
  <div>
    <HeroSection />
    <DetailsSection />
    <UsageSection />
    <ReferenciaSection />
  </div>
</template>

<script>
import HeroSection from '@/components/Home/HeroSection.vue';
import DetailsSection from '@/components/Home/DetailsSection.vue';
import UsageSection from '@/components/Home/UsageSection.vue';
import ReferenciaSection from '@/components/Home/ReferenciaSection.vue';


export default {
  name: 'HomeView',
  components: {
    HeroSection,
    DetailsSection,
    UsageSection,
    ReferenciaSection
  }
};
</script>