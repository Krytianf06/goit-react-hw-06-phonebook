import { configureStore } from '@reduxjs/toolkit';
import { contactReducer, filterReducer } from './reducers';
import {
  LOCAL_STORAGE_KEY_CONTACTS,
  LOCAL_STORAGE_KEY_FILTER,
  queryFromLocalStorage,
} from 'utils/localStorage';

const preloadedState = {
  contacts: queryFromLocalStorage(LOCAL_STORAGE_KEY_CONTACTS, []),
  filter: queryFromLocalStorage(LOCAL_STORAGE_KEY_FILTER, ''),
};

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});
