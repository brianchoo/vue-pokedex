import { toCapitalize } from '@/helpers/stringManipulation'

const getPokemonList = async (offset, limit) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await response.json()
  const pokemonList = data.results

  const detailedPokemonList = await Promise.all(
    pokemonList.map(async (pokemon) => {
      try {
        const res = await fetch(pokemon.url)
        const details = await res.json()

        return {
          details: {
            id: details.id,
            name: toCapitalize(details.name),
            image: details.sprites.other['official-artwork'].front_default,
          },
          stats: {
            height: details.height,
            weight: details.weight,
            hp: details.stats[0].base_stat,
            attack: details.stats[1].base_stat,
            defense: details.stats[2].base_stat,
            specialAttack: details.stats[3].base_stat,
            specialDefense: details.stats[4].base_stat,
            speed: details.stats[5].base_stat,
          },
        }
      } catch (error) {
        console.log('Error in getPokemonList', error)
      }
    }),
  )
  return detailedPokemonList
}

const loadMorePokemon = async (currentOffset, limit) => {
  try {
    const response = await getPokemonList(currentOffset, limit)
    return response
  } catch (error) {
    console.log('Error in loadMorePokemon', error)
  }
}

const getSinglePokemon = async (str) => {
  if (str) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${str}`)

      if (!res.ok) {
        throw new Error('No Pokémon found. Try searching again.')
      }

      const data = await res.json()
      return {
        details: {
          id: data.id,
          name: toCapitalize(data.name),
          image: data.sprites.other['official-artwork'].front_default,
        },
        stats: {
          height: data.height,
          weight: data.weight,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          specialAttack: data.stats[3].base_stat,
          specialDefense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        },
      }
    } catch (error) {
      console.error('Error in getSinglePokemon:', error)
      throw error
    }
  } else {
    return
  }
}

export { getPokemonList, loadMorePokemon, getSinglePokemon }
