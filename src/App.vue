<script setup>
import { onMounted, ref } from 'vue'
import Card from './components/Card.vue'
import SearchInput from './components/SearchInput.vue'
import Modal from './components/Modal.vue'
import { getPokemonList, loadMorePokemon, getSinglePokemon } from './services/pokemonApi'
import { loadFromLocalStorage, saveToLocalStorage } from './helpers/localStorage'
import { POKEMON_PER_API_CALL, LOCALSTORAGE_FAVORITE_POKEMON } from './constants/constants'

const isModalOpen = ref(false)
const favoritePokemon = ref(new Map())
const searchTerm = ref('')
const error = ref('')
const pokemonList = ref([])
const selectedPokemon = ref({})
const pokemonListParams = ref({
  offset: 0,
  limit: 0,
})

// Call initial set of Pokemon
const initialPokemonList = async () => {
  const response = await getPokemonList(0, POKEMON_PER_API_CALL)
  pokemonList.value = response
  pokemonListParams.value.limit = POKEMON_PER_API_CALL
  pokemonListParams.value.offset = POKEMON_PER_API_CALL
}

const handleLoadMore = async () => {
  const response = await loadMorePokemon(pokemonListParams.value.offset, POKEMON_PER_API_CALL)
  pokemonListParams.value.offset += POKEMON_PER_API_CALL
  pokemonList.value = [...pokemonList.value, ...response]
}

// Handle search
const handleSearch = async (query) => {
  error.value = ''
  searchTerm.value = query
  if (query) {
    try {
      const singlePokemon = await getSinglePokemon(query)
      pokemonList.value = [singlePokemon]
    } catch (err) {
      // pokemonList.value = []
      error.value = err.message
    }
  } else {
    searchTerm.value = ''
    initialPokemonList()
  }
}

const loadFavoritesFromLocalStorage = () => {
  const localStorageEntries = loadFromLocalStorage(LOCALSTORAGE_FAVORITE_POKEMON)
  favoritePokemon.value = localStorageEntries
}

const openPokemonModal = (pokemon) => {
  selectedPokemon.value = {
    ...pokemon,
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleFavorite = (pokemon) => {
  if (pokemon && pokemon.details.id) {
    const pokemonId = pokemon.details.id
    const isFavorite = favoritePokemon.value.get(pokemonId)
    favoritePokemon.value.set(pokemonId, !isFavorite)
    saveToLocalStorage(LOCALSTORAGE_FAVORITE_POKEMON, favoritePokemon)
  }
}

onMounted(() => {
  initialPokemonList()
  loadFavoritesFromLocalStorage()
})
</script>

<template>
  <main class="p-10 bg-amber-200 min-h-screen">
    <h1 class="text-title font-bold text-slate-900">Pokédex</h1>
    <h3 class="font-bold text-slate-900">Search for a Pokémon by nama or id number</h3>
    <div class="my-4">
      <SearchInput :initialValue="searchTerm" @search="handleSearch" />
      <div class="text-red-500 mt-2">{{ error }}</div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:w-3/4">
      <Card
        v-for="pokemon in pokemonList"
        :key="pokemon.details.id"
        :name="pokemon.details.name"
        :id="pokemon.details.id"
        :image="pokemon.details.image"
        :is-favorite="favoritePokemon.get(pokemon.details.id) || false"
        @click="openPokemonModal(pokemon)"
        @toggle-favorite="() => handleFavorite(pokemon)"
      />
      <div
        v-if="!searchTerm || error"
        class="flex self-center bg-amber-400 h-12 items-center justify-center rounded-md font-bold cursor-pointer hover:bg-amber-600 transition duration-250 ease-in-out"
        @click="handleLoadMore"
      >
        Load More
      </div>
    </div>
    <Modal
      :is-open="isModalOpen"
      :pokemon="selectedPokemon"
      @close="closeModal"
      @toggle-favorite="() => handleFavorite(selectedPokemon)"
      :is-favorite="
        (selectedPokemon.details && favoritePokemon.get(selectedPokemon.details.id)) || false
      "
    />
  </main>
</template>
