import { URL } from './settingsUrl';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found!'));
}

export function fetchTrending() {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}trending/movie/day?api_key=${URL.KEY}`,
  );
}

export function fetchSearchMovies(query) {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}search/movie?api_key=${URL.KEY}&languege=en-US&page=1&include_adult=false&query=${query}`,
  );
}

export function fetchMovieDetails(movieId) {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}movie/${movieId}?api_key=${URL.KEY}&languedge=en-US`,
  );
}

export function fetchMovieCast(movieId) {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}movie/${movieId}/credits?api_key=${URL.KEY}&languedge=en-US`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${URL.BASE_URL}movie/${movieId}/reviews?api_key=${URL.KEY}&languedge=en-US&page=1`,
  );
}
