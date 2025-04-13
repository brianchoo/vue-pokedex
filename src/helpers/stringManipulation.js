const padString = (id, num) => {
  return String(id).padStart(num, '0')
}

const toCapitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export { padString, toCapitalize }
