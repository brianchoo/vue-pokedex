const saveToLocalStorage = (localStorageName, state) => {
  const favoritesObject = Object.fromEntries(state.value)
  localStorage.setItem(localStorageName, JSON.stringify(favoritesObject))
}

const loadFromLocalStorage = (localStorageName) => {
  const storedFavorites = localStorage.getItem(localStorageName)
  if (storedFavorites) {
    try {
      const favoritesObject = JSON.parse(storedFavorites)
      const localStorageEntries = Object.entries(favoritesObject).map(([key, value]) => {
        return [Number(key), value] // Convert the key from string to number
      })
      // Convert the object back to a Map
      return new Map(localStorageEntries)
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error)
    }
  }
}

export { saveToLocalStorage, loadFromLocalStorage }
