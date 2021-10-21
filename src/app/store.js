import { configureStore } from '@reduxjs/toolkit';

import comicsReducer from '../features/comics/comicsSlice';
import comicCharactersReducer from '../features/comics/comicCharactersSlice';
import comicCreatorsReducer from '../features/comics/comicCreatorsSlice';

const store = configureStore({
  reducer: {
    comics: comicsReducer,
    comicCharacters: comicCharactersReducer,
    comicCreators: comicCreatorsReducer
  }
});

export default store;
