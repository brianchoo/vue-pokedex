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
      class="w-full px-4 py-2 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    />
    <button @click="handleSearch" class="absolute right-2 top-3 text-gray-500 hover:text-blue-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
</template>
