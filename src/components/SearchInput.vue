<script setup>
import { ref } from 'vue'

const props = defineProps({
  initialValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['search'])

const searchQuery = ref(props.initialValue)

const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="relative w-full max-w-md">
    <input
      type="text"
      v-model="searchQuery"
      @keyup.enter="handleSearch"
      placeholder="Name or id number"
      class="w-full px-4 py-2 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-400"
    />
    <button
      @click="handleSearch"
      class="absolute right-3 top-3 text-gray-500 hover:text-blue-500 cursor-pointer"
    >
      <img
        class="w-4 h-4"
        src="/src/assets/icons/magnifying-glass-solid.svg"
        alt="magnifying-glass-solid"
      />
    </button>
  </div>
</template>
