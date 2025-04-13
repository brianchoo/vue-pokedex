<script setup>
import { ref, defineProps } from 'vue'

const isFavorite = ref(false)
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
})

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  alert('clicked here')
}
</script>

<template>
  <div
    class="rounded-lg overflow-hidden shadow-md bg-white max-w-xs hover:shadow-xl transition-shadow duration-300 cursor-pointer"
  >
    <div class="relative">
      <div class="flex items-center justify-center">
        <img :src="image" :alt="name" class="h-40 object-contain" />
      </div>

      <button @click="toggleFavorite" class="absolute top-2 right-2 p-2 rounded-full">
        <svg
          class="h-4 w-4"
          :class="{ 'fill-slate-100': !isFavorite, 'fill-red-500': isFavorite }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
          />
        </svg>
      </button>
    </div>

    <div class="p-4 flex flex-col justify-center items-center">
      <h2 class="text-xl font-bold mb-1">{{ name }}</h2>
      <div class="text-gray-500 mb-2">{{ id }}</div>
    </div>
  </div>
</template>
