export const BASE_URL = `https://api.themoviedb.org/3`

const fetchData = async (path, query = {}) => {
  const url = new URL(BASE_URL + path)
  const url_query = {
    api_key: process.env.VUE_APP_API_KEY,
    ...query,
  }
  url.search = new URLSearchParams(url_query)
  return await fetch(url.toString())
}

export async function getListDiscoverMovies() {
  try {
    const result = await fetchData('/discover/movie')
    return result.json()
  } catch (e) {
    console.log(e)
  }
}

export async function searchMovies(searchString) {
  try {
    const result = await fetchData('/search/movie', { query: searchString })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}

export async function getMovieDetails(movie_id) {
  try {
    const result = await fetchData(`/movie/${movie_id}`, { append_to_response: 'videos,images' })
    return result.json()
  } catch (e) {
    console.log(e)
  }
}
