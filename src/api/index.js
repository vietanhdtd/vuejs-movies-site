export const BASE_URL = 'https://api.themoviedb.org/3'

export async function getListDiscoverMovies() {
  const result = await fetch(`${BASE_URL}/discover/movie?api_key=${process.env.VUE_APP_API_KEY}`)
  // const { results } = await result.json();
  // console.log('results: ', result.json());
  return result.json()
}
