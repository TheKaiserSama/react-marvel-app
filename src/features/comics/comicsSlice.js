import { 
  createAsyncThunk, 
  createSlice, 
  createEntityAdapter 
} from '@reduxjs/toolkit';

import { getAllComics, getComicById } from '../../api/api';

const comicsAdapter = createEntityAdapter();

const initialState = comicsAdapter.getInitialState({
  status: 'idle',
  error: null,
  activeComic: null,
  creatorsByComic: [],
  filters: {
    limit: 20,
    offset: 0,
    total: 0,
    currentPage: 0,
    titleStartsWith: null
  }
});

export const fetchComics = createAsyncThunk(
  'comics/fetchComics',
  async (queryParams, { dispatch }) => {
    const data = await getAllComics({ ...queryParams });
    const { limit, offset, total, results } = data;

    dispatch(filtersUpdated({ 
      offset, 
      limit, 
      total,
      titleStartsWith: queryParams?.titleStartsWith || null
    }));

    return results;
  }
);

export const fetchComicById = createAsyncThunk(
  'comics/fetchComicById',
  async (comicId) => {
    return await getComicById(comicId);
  }
);

const comicsSlice = createSlice({
  name: 'comics',
  initialState,
  reducers: {
    filtersUpdated(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComics.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchComics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        comicsAdapter.removeAll(state);
        comicsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchComics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = new Error('Error fetching data');
      })
      .addCase(fetchComicById.fulfilled, (state, action) => {
        state.activeComic = action.payload;
      });
  }
});

export default comicsSlice.reducer;

export const { filtersUpdated } = comicsSlice.actions;

export const {
  selectAll: selectAllComics,
  selectById: selectComicById,
  selectIds: selectComicIds
} = comicsAdapter.getSelectors(state => state.comics);
