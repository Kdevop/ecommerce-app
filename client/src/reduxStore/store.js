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


// export const persistor = persistStore(store);

// const authPersistConfig = {
//     key: 'auth',
//     storage,
// };

// const rootReducers = combineReducers({
//    auth: persistReducer(authPersistConfig, authSlice),
//    products: productSlice,
//    cart: cartSlice,
//    user: userSlice,
//    orders: ordersSlice,
// })


// import { persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER, } from 'redux-persist';
// import storage from "redux-persist/lib/storage";

