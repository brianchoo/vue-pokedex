<script setup>
import Table from './Table.vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  pokemon: {
    type: Object,
  },
})

defineEmits(['close'])
</script>

<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-100/30"
      @click="$emit('close')"
    >
      <div class="bg-white w-[75%] h-[75%] relative rounded-lg shadow-lg" @click.stop>
        <div class="flex h-full">
          <div class="flex flex-col items-center justify-center w-2/5">
            <img :src="pokemon.details.image" :alt="pokemon.details.name" />
            <div class="font-bold text-title">{{ pokemon.details.name }}</div>
            <div class="font-bold text-title text-slate-400">{{ pokemon.details.id }}</div>
          </div>
          <div class="w-3/5 bg-slate-100">
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
