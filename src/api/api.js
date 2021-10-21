import { normalizeComic, normalizeComics } from './normalizeComics';
import { normalizeCreators } from './normalizeCreators';
import { normalizeCharacters } from './normalizeCharacters';

const BASE_URL = 'https://gateway.marvel.com:443/v1/public';

const API_CREDENTIALS = {
  apikey: 'b2fe4031b105b678f7c22d8fa85386cf',
  hash: 'e278b988a47a269ac9612d85dda78246',
  ts: '1'
};

export const getAllComics = async (params = {}) => {
  const url = new URL(`${BASE_URL}/comics`);
  const customParams = {
    ...API_CREDENTIALS,
    ...checkParams(params)
  };
  url.search = new URLSearchParams(customParams).toString();

  const response = await fetch(url);
  const { data } = await response.json();

  return normalizeComics(data);
};

export const getComicById = async (comicId) => {
  const url = new URL(`${BASE_URL}/comics/${comicId}`);
  const customParams = {
    ...API_CREDENTIALS
  };
  url.search = new URLSearchParams(customParams).toString();

  const response = await fetch(url);
  const { data } = await response.json();
  
  return normalizeComic(data.results[0]);
}

export const getCreatorsByComic = async (comicId) => {
  const url = new URL(`${BASE_URL}/comics/${comicId}/creators`);
  const customParams = {
    ...API_CREDENTIALS
  };
  url.search = new URLSearchParams(customParams).toString();

  const response = await fetch(url);
  const { data } = await response.json();

  return normalizeCreators(data);
};

export const getCharactersByComic = async (comicId) => {
  const url = new URL(`${BASE_URL}/comics/${comicId}/characters`);
  const customParams = {
    ...API_CREDENTIALS
  };
  url.search = new URLSearchParams(customParams).toString();

  const response = await fetch(url);
  const { data } = await response.json();

  return normalizeCharacters(data);
};

function checkParams(params) {
  const queryParams = {};

  for (let key in params) {
    if (params[key] !== null && params[key] !== undefined) {
      queryParams[key] = params[key];
    }
  }

  return queryParams;
}

