<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Stats',
  },
  pokemon: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const statsLabel = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  specialAttack: 'Special Attack',
  specialDefense: 'Special Defense',
  speed: 'Speed',
  height: 'Height',
  weight: 'Weight',
}
</script>

<template>
  <div class="rounded-md p-10 w-full">
    <div class="text-title font-bold mb-4">{{ title }}</div>
    <div class="flex flex-col gap-3">
      <div v-for="(value, key, index) in pokemon.stats" :key="key" class="flex justify-between">
        <div
          class="font-bold w-6/8 mr-2 px-3 py-2 rounded-sm"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
        >
          {{ statsLabel[key] || key }}
        </div>
        <div
          class="font-bold text-right w-2/8 ml-2 px-3 py-2 rounded-sm"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>
