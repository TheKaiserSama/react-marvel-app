import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit';

import { getCharactersByComic } from '../../api/api';

const comicCharactersAdapter = createEntityAdapter();

const initialState = comicCharactersAdapter.getInitialState({
  status: 'idle',
  error: null,
  filters: {
    limit: 20,
    offset: 0,
    total: 0
  }
});

export const fetchCharactersByComic = createAsyncThunk(
  'comics/fetchCharactersByComic',
  async (comicId, { dispatch }) => {
    const data = await getCharactersByComic(comicId);
    const { limit, offset, total, results } = data;

    dispatch(filtersUpdated({
      limit, offset, total
    }));
    
    return results;
  }
);

const comicCharactersSlice = createSlice({
  name: 'comicCharacters',
  initialState,
  reducers: {
    filtersUpdated(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCharactersByComic.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCharactersByComic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        comicCharactersAdapter.removeAll(state);
        comicCharactersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchCharactersByComic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = new Error('Error fetching data');
      })
  }
});

export default comicCharactersSlice.reducer;

export const { filtersUpdated } = comicCharactersSlice.actions;

export const {
  selectAll: selectAllComicCharacters,
  selectById: selectComicCharacterById,
  selectIds: selectComicCharactersIds
} = comicCharactersAdapter.getSelectors(state => state.comicCharacters);
