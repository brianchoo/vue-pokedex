<script setup>
import { onMounted, ref } from 'vue'
import Card from './components/Card.vue'
import SearchInput from './components/SearchInput.vue'
import Modal from './components/Modal.vue'
import { getPokemonList, loadMorePokemon } from './services/pokemonApi'

const pokemonPerApiCall = 10
const searchTerm = ref('')
const pokemonList = ref([])
const selectedPokemon = ref({})
const pokemonListParams = ref({
  offset: 0,
  limit: 0,
})
const isModalOpen = ref(false)
// const isFavorite = ref(false)
const favoritePokemon = ref(new Map())

// Call initial set of Pokemon
const initialPokemonList = async () => {
  const response = await getPokemonList(0, pokemonPerApiCall)
  pokemonList.value = response
  pokemonListParams.value.limit = pokemonPerApiCall
  pokemonListParams.value.offset = pokemonPerApiCall
  console.log(pokemonListParams.value.limit, 'pokemonListParams.value.limit')
}

const handleLoadMore = async () => {
  const response = await loadMorePokemon(pokemonListParams.value.offset, pokemonPerApiCall)
  pokemonListParams.value.offset += pokemonPerApiCall
  pokemonList.value = [...pokemonList.value, ...response]
  console.log(pokemonList.value, 'pokemonList')
}

// Handle search
const handleSearch = (query) => {
  searchTerm.value = query
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
  console.log('Pokemon received:', pokemon)
  if (pokemon && pokemon.details.id) {
    const pokemonId = pokemon.details.id
    const isFavorite = favoritePokemon.value.get(pokemonId)
    favoritePokemon.value.set(pokemonId, !isFavorite)
  }
}

onMounted(() => {
  initialPokemonList()
})
</script>

<template>
  <main class="p-10 bg-amber-200 min-h-screen">
    <h1 class="text-title font-bold">Pokedex</h1>
    <h3 class="font-bold">Search for a Pokemon by nama or id number</h3>
    <div class="my-4">
      {{ searchTerm }}
      <SearchInput :initialValue="searchTerm" @search="handleSearch" />
    </div>
    <div class="grid grid-cols-6 gap-4 w-3/4">
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
      :is-favorite="
        (selectedPokemon.details && favoritePokemon.get(selectedPokemon.details.id)) || false
      "
    />
  </main>
</template>
