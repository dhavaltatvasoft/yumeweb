import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import appReducer from '../reducers/appReducer';
import apiReducer from '../reducers/apiReducer';

// 1. Combine all your reducers
const rootReducer : any = combineReducers({
  appReducer,
  apiReducer,
});

// 2. Setup persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['appReducer'],
};

// 3. Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistedStore = persistStore(store);

export { store, persistedStore };
