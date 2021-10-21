import { 
  createSlice, 
  createAsyncThunk, 
  createEntityAdapter 
} from '@reduxjs/toolkit';

import { getCreatorsByComic } from '../../api/api';

const comicCreatorsAdapter = createEntityAdapter();

const initialState = comicCreatorsAdapter.getInitialState({
  status: 'idle',
  error: null,
  filters: {
    limit: 20,
    offset: 0,
    total: 0
  }
});

export const fetchCreatorsByComic = createAsyncThunk(
  'comics/fetchCreatorsByComic',
  async (comicId, { dispatch }) => {
    const data = await getCreatorsByComic(comicId);
    const { limit, offset, total, results } = data;
    
    dispatch(filtersUpdated({
      limit, offset, total
    }));

    return results;
  }
);

const comicCreatorsSlice = createSlice({
  name: 'comicCreators',
  initialState,
  reducers: {
    filtersUpdated(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCreatorsByComic.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCreatorsByComic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        comicCreatorsAdapter.removeAll(state);
        comicCreatorsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchCreatorsByComic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = new Error('Error fetching data');
      });
  }
});

export default comicCreatorsSlice.reducer;

export const { filtersUpdated } = comicCreatorsSlice.actions;

export const {
  selectAll: selectAllComicCreators,
  selectById: selectComicCreatorById,
  selectIds: selectComicCreatorsIds
} = comicCreatorsAdapter.getSelectors(state => state.comicCreators);
