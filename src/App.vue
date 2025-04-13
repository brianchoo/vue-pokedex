<script setup>
import { onMounted, ref } from 'vue'
import Card from './components/Card.vue'
import SearchInput from './components/SearchInput.vue'
import Modal from './components/Modal.vue'
import { loadFromLocalStorage, saveToLocalStorage } from './helpers/localStorage'
import { LOCALSTORAGE_FAVORITE_POKEMON } from './constants/constants'
import { useModal } from './composables/useModal'
import { usePokemon } from './composables/usePokemon'

const favoritePokemon = ref(new Map())

const { isOpen: isModalOpen, selectedPokemon, openModal, closeModal } = useModal()
const { pokemonList, error, searchTerm, fetchInitialPokemon, loadMore, searchPokemon } =
  usePokemon()

// Handle search
const handleSearch = async (query) => {
  searchPokemon(query)
}

const loadFavoritesFromLocalStorage = () => {
  const localStorageEntries = loadFromLocalStorage(LOCALSTORAGE_FAVORITE_POKEMON)
  favoritePokemon.value = localStorageEntries
}

const toggleFavorite = (pokemon) => {
  if (pokemon && pokemon.details.id) {
    const pokemonId = pokemon?.details?.id

    // redeclare new Map() if initial favoritePokemon value is undefined
    if (!favoritePokemon.value) {
      favoritePokemon.value = new Map()
    }

    if (favoritePokemon?.value.size === 0) {
      favoritePokemon?.value.set(pokemonId, true)
    } else {
      const isFavorite = favoritePokemon?.value.get(pokemonId)
      favoritePokemon?.value.set(pokemonId, !isFavorite)
    }
    saveToLocalStorage(LOCALSTORAGE_FAVORITE_POKEMON, favoritePokemon)
  }
}

onMounted(() => {
  fetchInitialPokemon()
  loadFavoritesFromLocalStorage()
})
</script>

<template>
  <main class="p-10 bg-amber-200 min-h-screen">
    <h1 class="text-title font-bold text-slate-900">Pokédex</h1>
    <h3 class="font-bold text-slate-900">Search for a Pokémon by name or id number</h3>
    <div class="my-4">
      <SearchInput :initialValue="searchTerm" @search="handleSearch" />
      <div class="text-red-500 mt-2">{{ error }}</div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:w-3/4">
      <Card
        v-for="pokemon in pokemonList"
        :key="pokemon?.details?.id"
        :name="pokemon?.details?.name"
        :id="pokemon?.details?.id"
        :image="pokemon?.details?.image"
        :is-favorite="favoritePokemon ? favoritePokemon.get(pokemon?.details?.id) : false"
        @click="openModal(pokemon)"
        @toggle-favorite="() => toggleFavorite(pokemon)"
      />
      <div
        v-if="!searchTerm || error"
        class="flex self-center bg-amber-400 h-12 items-center justify-center rounded-md font-bold cursor-pointer hover:bg-amber-600 transition duration-250 ease-in-out"
        @click="loadMore"
      >
        Load More
      </div>
    </div>
    <Modal
      :is-open="isModalOpen"
      :pokemon="selectedPokemon"
      @close="closeModal"
      @toggle-favorite="() => toggleFavorite(selectedPokemon)"
      :is-favorite="
        selectedPokemon?.details &&
        (favoritePokemon ? favoritePokemon.get(selectedPokemon?.details?.id) : false)
      "
    />
  </main>
</template>
