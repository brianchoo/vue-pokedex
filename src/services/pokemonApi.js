const getPokemonList = async (offset, limit) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await response.json()
  const pokemonList = data.results

  const detailedPokemonList = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const details = await res.json()

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork'].front_default,
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
