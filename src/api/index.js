export const BASE_URL = 'https://api.themoviedb.org/4'

export async function getListDiscoverMovies() {
  try {
    const result = await fetch(`${BASE_URL}/discover/movie?api_key=${process.env.VUE_APP_API_KEY}`)
    return result.json()
  } catch (e) {
    console.log(e)
  }
}

export async function searchMovies(searchString) {
  try {
    const result = await fetch(
      `${BASE_URL}/search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${searchString}`,
    )
    return result.json()
  } catch (e) {
    console.log(e)
  }
}
