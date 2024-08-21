import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { thunk as thunkMiddleWare } from 'redux-thunk';

const rootReducers = combineReducers({
    auth: authSlice
})

const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefualtMiddleware) => getDefualtMiddleware().concat(thunkMiddleWare)
});

export default store;