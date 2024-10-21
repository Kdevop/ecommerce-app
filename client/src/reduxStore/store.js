import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import userSlice from './userSlice';
import ordersSlice from './ordersSlice';
import { thunk as thunkMiddleWare } from 'redux-thunk';


 const rootReducers = combineReducers({
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    user: userSlice,
    orders: ordersSlice,
})

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleWare)
});


