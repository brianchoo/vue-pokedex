<script setup>
import Table from './Table.vue'
import { padString } from '@/helpers/stringManipulation'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  pokemon: {
    type: Object,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close', 'toggleFavorite'])
</script>

<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-400/70 overflow-auto"
      @click="$emit('close')"
    >
      <div
        class="bg-white w-[90%] h-[90%] lg:w-[75%] lg:h-[75%] relative rounded-lg shadow-lg"
        @click.stop
      >
        <div class="flex flex-col md:flex-row h-full">
          <div class="flex flex-col items-center justify-center md:w-2/5 relative">
            <img class="w-4/5" :src="pokemon.details.image" :alt="pokemon.details.name" />
            <div class="font-bold text-title">{{ pokemon.details.name }}</div>
            <div class="font-bold text-title text-slate-400">
              {{ padString(pokemon.details.id, 4) }}
            </div>
            <button
              @click.stop="$emit('toggleFavorite')"
              class="absolute top-3 right-3 p-2 rounded-full cursor-pointer"
            >
              <svg
                class="h-12 w-12"
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
          <div class="md:w-3/5 bg-slate-100">
            <Table :pokemon="pokemon" />
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="absolute -top-5 -right-5 rounded-full bg-amber-400 p-2 hover:bg-amber-600 transition duration-250 ease-in-out cursor-pointer"
        >
          <img class="w-10 h-10" src="../assets/icons/xmark-solid.svg" alt="x-mark" />
        </button>
      </div>
    </div>
  </teleport>
</template>
