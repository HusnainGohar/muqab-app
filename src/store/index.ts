import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { persistStore, persistReducer } from 'redux-persist'
import { api } from '../apis';
import { authSlice } from './slices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TypedUseSelectorHook, useSelector as useAppSelector } from 'react-redux';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [authSlice.name]: authSlice.reducer,
});

const persistConfig = {
  key: 'root', // The key in local storage
  storage: AsyncStorage,     // The storage engine to use (e.g., AsyncStorage)
  whitelist: [authSlice.name], // Reducer names to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export const persistor = persistStore(store)

setupListeners(store.dispatch);