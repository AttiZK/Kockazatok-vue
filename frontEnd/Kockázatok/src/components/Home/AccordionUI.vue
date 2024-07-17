<template>
  <div>
    <div
      @click="handleSetIndex(id)"
      :class="['cursor-pointer items-end px-6 pt-10 pb-4 mt-2 rounded-md focus:bg-blue-500', index === id && 'bg-white rounded-bl-none rounded-br-none drop-shadow-[7px_5px_0_#D4ECFF]']"
    >
      <div class="group cursor-pointer relative w-full">
        <h3 class="text-blue-800 text-2xl font-bold group-hover:text-blue-700 relative mr-6">
          {{ title }}
        </h3>
        <div class="items-center justify-center">
          <svg
            v-if="index !== id"
            class="absolute right-0 top-0"
            width="18"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m10.299 2.082 6.062 10.5a1.5 1.5 0 0 1-1.299 2.25H2.938a1.5 1.5 0 0 1-1.3-2.25l6.063-10.5c.577-1 2.02-1 2.598 0Z" fill="#D4ECFF" stroke="#1B3266" />
          </svg>
          <svg
            v-else
            class="absolute right-0 top-0 rotate-180"
            width="18"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m10.299 2.082 6.062 10.5a1.5 1.5 0 0 1-1.299 2.25H2.938a1.5 1.5 0 0 1-1.3-2.25l6.063-10.5c.577-1 2.02-1 2.598 0Z" fill="#D4ECFF" stroke="#1B3266" />
          </svg>
        </div>
      </div>
    </div>
    <div
      v-if="index === id"
      class="flex-col gap-4 bg-white font-serif text-blue-800 h-auto rounded-b-md px-6 pb-10 border-blue-300 mb-2 drop-shadow-[7px_5px_0_#D4ECFF]"
    >
      {{ content }}
      <CTA1 text="Fizessen elő a webappra" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    content: String,
    id: Number,
    index: Number
  },
 
  methods: {
    handleSetIndex(id) {
      if (this.index !== id) {
        this.$emit('setIndex', id);
      }
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
