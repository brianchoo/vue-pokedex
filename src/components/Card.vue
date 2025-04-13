<script setup>
import { defineProps, defineEmits } from 'vue'
import { padString } from '@/helpers/stringManipulation'

defineProps({
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
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click', 'toggleFavorite'])
</script>

<template>
  <div
    class="rounded-lg overflow-hidden shadow-md bg-white max-w-xs hover:shadow-xl hover:bg-amber-50 transition-shadow duration-300 cursor-pointer"
  >
    <div class="relative pt-10" @click="$emit('click')">
      <div class="flex items-center justify-center">
        <img :src="image" :alt="name" class="object-contain w-4/5" />
      </div>
      <div class="p-4 flex flex-col justify-center items-center">
        <h2 class="text-xl font-bold mb-1 text-slate-900">{{ name }}</h2>
        <div class="text-slate-400 font-bold -mt-1">{{ padString(id, 4) }}</div>
      </div>

      <button
        @click.stop="$emit('toggleFavorite')"
        class="absolute top-1 right-1 p-2 rounded-full cursor-pointer"
      >
        <svg
          class="h-7 w-7"
          :class="!isFavorite ? 'fill-slate-100' : 'fill-red-500'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
