import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productInit } from '../apis/apiRequest';

export const getProducts = createAsyncThunk('products/getProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await productInit();
        if(!response.success) {
            console.warn(`Unbale to get products: ${response.message}`);
            return rejectWithValue(response.message);
        }

        console.log(response); //this can be deleted once ready to build.
        return response.data;
    } catch (error) {
        console.error('Error getting products', error);
        return rejectWithValue(error.message);
    }
});

const initialState = {
    isLoading: false, 
    error: false,
    loaded: false, 
    data: [],
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loaded = true;
                state.data = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false; 
                state.error = true;
            })
    }
});

export default productSlice.reducer;
export const productError = state => state.products.error;
export const loadingProducts = state => state.products.isLoading;
export const productsReturned = state => state.products.data;

