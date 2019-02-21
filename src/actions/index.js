import { API_URL } from '../config';

export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';
export const LOAD_MORE_ITEMS = 'LOAD_MORE_ITEMS';
export const GET_MOVIE = 'GET_MOVIE';
export const MOVIE = 'CLEAR_MOVIE';

export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER';

export function getPopularMovies() {
  const endpoint = `${API_URL}/movies/1`;
  const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      return result;
    });
  // console.log(result)
  return {
    type: 'GET_POPULAR_MOVIES',
    payload: request,
  };
}

export function loadMoreItems(currentPage) {
  let endpoint = '';
  endpoint = `${API_URL}/movies/${currentPage + 1}`;
  const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {
      return result;
    });
  // console.log(result)
  return {
    type: 'LOAD_MORE_ITEMS',
    payload: request,
  };
}

export function clearMovies() {
  return {
    type: 'CLEAR_MOVIES',
    payload: null,
  };
}

export function showLoadingSpinner() {
  return {
    type: 'SHOW_LOADING_SPINNER',
    payload: null,
  };
}
