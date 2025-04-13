import { ref } from 'vue'
import { getPokemonList, loadMorePokemon, getSinglePokemon } from '@/services/pokemonApi'
import { POKEMON_PER_API_CALL } from '@/constants/constants'

export function usePokemon() {
  const pokemonList = ref([])
  const error = ref('')
  const searchTerm = ref('')
  const pokemonListParams = ref({
    offset: 0,
    limit: POKEMON_PER_API_CALL,
  })

  const fetchInitialPokemon = async () => {
    try {
      const response = await getPokemonList(0, POKEMON_PER_API_CALL)
      pokemonList.value = response
      pokemonListParams.value.offset = POKEMON_PER_API_CALL
    } catch (err) {
      console.error(err)
    }
  }

  const loadMore = async () => {
    try {
      const response = await loadMorePokemon(pokemonListParams.value.offset, POKEMON_PER_API_CALL)
      pokemonListParams.value.offset += POKEMON_PER_API_CALL
      pokemonList.value = [...pokemonList.value, ...response]
    } catch (err) {
      console.error(err)
    }
  }

  const searchPokemon = async (query) => {
    error.value = ''
    searchTerm.value = query

    if (!query.trim()) {
      return fetchInitialPokemon()
    }

    try {
      const singlePokemon = await getSinglePokemon(query.toLowerCase())
      pokemonList.value = [singlePokemon]
    } catch (err) {
      error.value = `Could not find Pokémon "${query}"`
      console.error(err)
    }
  }

  return {
    pokemonList,
    error,
    searchTerm,
    fetchInitialPokemon,
    loadMore,
    searchPokemon,
  }
}
