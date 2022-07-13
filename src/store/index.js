import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root.reducer.js';

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true,
};

const middleware = [thunk];
const reducers = persistCombineReducers(config, rootReducer);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig: any = { enhancers };

const store = createStore(reducers, undefined, compose(...enhancers));

const persistor = persistStore(store, persistConfig);

const configureStore = () => {
  return { persistor, store };
};

export default configureStore;