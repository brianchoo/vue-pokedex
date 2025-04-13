import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)
  const selectedPokemon = ref({})

  const openModal = (pokemon) => {
    selectedPokemon.value = {
      ...pokemon,
    }
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    selectedPokemon,
    openModal,
    closeModal,
  }
}
