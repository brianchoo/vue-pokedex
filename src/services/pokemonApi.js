import { toCapitalize } from '@/helpers/toCapitalize'

const getPokemonList = async (offset, limit) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await response.json()
  const pokemonList = data.results

  const detailedPokemonList = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const details = await res.json()

      // return {
      //   id: details.id,
      //   name: details.name,
      //   image: details.sprites.other['official-artwork'].front_default,
      //   height: details.height,
      //   weight: details.weight,
      //   hp: details.stats[0].base_stat,
      //   attack: details.stats[1].base_stat,
      //   defense: details.stats[2].base_stat,
      //   specialAttack: details.stats[3].base_stat,
      //   specialDefense: details.stats[4].base_stat,
      //   speed: details.stats[5].base_stat,
      // }
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
    }),
  )
  console.log(detailedPokemonList)
  return detailedPokemonList
}

const loadMorePokemon = async (currentOffset, limit) => {
  const response = await getPokemonList(currentOffset, limit)
  return response
}

export { getPokemonList, loadMorePokemon }
