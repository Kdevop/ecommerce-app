import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import authSlice from './authSlice';
import productSlice from './productSlice';
import { thunk as thunkMiddleWare } from 'redux-thunk';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const rootReducers = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    products: productSlice,
})

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefualtMiddleware) => getDefualtMiddleware().concat(thunkMiddleWare)
});


export const persistor = persistStore(store);

