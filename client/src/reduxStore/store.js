import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import { thunk as thunkMiddleWare } from 'redux-thunk';

const rootReducers = combineReducers({
    auth: authSlice,
    products: productSlice,
})

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefualtMiddleware) => getDefualtMiddleware().concat(thunkMiddleWare)
});

export default store;
