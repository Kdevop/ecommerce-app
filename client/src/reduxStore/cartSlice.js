import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customerCart, insertToCart, amendCart, deleteProduct } from '../apis/apiRequest';

//get cart here.
export const getCart = createAsyncThunk('cart/getCart', async (_, { rejectWithValue }) => {
    try {
        const response = await customerCart();

        if(!response.success) {
            console.warn(`Unable to get cart details due to: ${response.message}` );
            return rejectWithValue(response.message);
        }

        return response 

    } catch (error) {
        console.error('Error collecting cart', error);
        return rejectWithValue(error.message);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (productDetails, {rejectWithValue}) => {
    try {
        const response = await insertToCart(productDetails);
        
        if(!response.success) {
            console.warn(`Unable to add product to cart due to: ${response.message}`);
            return rejectWithValue(response.message)
        }

        return response;

    } catch (error) {
        console.error(`Error adding product to cart`, error);
        return rejectWithValue(error);
    }
});

export const updateCart = createAsyncThunk('cart/updateCart', async (details, {rejectWithValue}) => {
    try {
        const response = await amendCart(details);
        
        if(!response.success) {
            console.warn(`Unable to add product to cart due to: ${response.message}`);
            return rejectWithValue(response.message)
        }

        return response; 
    } catch (error) {
        console.error(`Error adding product to cart`, error);
        return rejectWithValue(error);
    }
});

export const deleteItem = createAsyncThunk('cart/deleteItem', async (id, {rejectWithValue}) => {

    try {
        const response = await deleteProduct(id);
        
        if(!response.success) {
            console.warn(`Unable to delete product due to: ${response.message}`);
            return rejectWithValue(response.message);
        }

        return response;
    } catch (error) {
        console.error(`Error deleting product from cart`, error);
        return rejectWithValue(error);
    }
});

const initialState = {
    fetchingCart: false,
    gotCart: false,
    errorCart: false,
    data: [],
    initUpdate: false,
    cartUpdate: false,
    cartUpdateError: false
}; 

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        resetUpdateCart: (state) => {
            state.cartUpdate = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCart.pending, (state) => {
                state.fetchingCart = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.gotCart = true;
                state.fetchingCart = false; 
                state.data = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.fetchingCart = true;
                state.errorCart = true;
                state.data = action.payload;
            })
            .addCase(addToCart.pending, (state) => {
                state.initUpdate = true;
                state.cartUpdate = false;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.initCart = false;
                state.cartUpdate = action.payload;
            })
            .addCase(addToCart.rejected, (state) => {
                state.initCart = false;
                state.cartUpdateError = true;
            })
            .addCase(resetUpdateCart, (state) => {
                state.cartUpdate = false;
            })
            .addCase(updateCart.pending, (state) => {
                state.initUpdate = true;
                state.cartUpdate = false;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.initCart = false;
                state.cartUpdate = action.payload;
            })
            .addCase(updateCart.rejected, (state) => {
                state.initCart = false;
                state.cartUpdateError = true;
            })
            .addCase(deleteItem.pending, (state) => {
                state.initUpdate = true;
                state.cartUpdate = false;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.initCart = false;
                state.cartUpdate = true;
            })
            .addCase(deleteItem.rejected, (state) => {
                state.initCart = false;
                state.cartUpdateError = true;
            })
    }
});

export const resetUpdateCart = cartSlice.actions.resetUpdateCart;
export default cartSlice.reducer;
export const cartData = state => state.cart.data;
export const cartReturned = state => state.cart.gotCart;
export const cartError = state => state.cart.errorCart;
export const cartUpdate = state => state.cart.cartUpdate;


