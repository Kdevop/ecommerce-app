import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productInit, productById, productByCat } from '../apis/apiRequest';

export const getProducts = createAsyncThunk('products/getProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await productInit();
        if(!response.success) {
            console.warn(`Unbale to get products: ${response.message}`);
            return rejectWithValue(response.message);
        }

       
        return response.data;
    } catch (error) {
        console.error('Error getting products', error);
        return rejectWithValue(error.message);
    }
}); 

export const getProductById = createAsyncThunk('product/getProductById', async (id, {rejectWithValue}) => {
    try {
        const response = await productById(id);

        if(!response.success) {
            console.warn(`Unable to get product: ${response.message}`);
            return rejectWithValue(response.message);
        }

        return response.data;

    } catch (error) {
        console.error('Error getting the product by Id: ', error);
        return rejectWithValue(error.message);
    }
})

export const getProductByCategory = createAsyncThunk('product/getProductByCategory', async (category, {rejectWithValue}) => {
    try{ 
        const response = await productByCat(category);

        if(!response.success) {
            console.warn(`Unable to get product: ${response.message}`);
            return rejectWithValue(response.message);
        }

        return response.data;

    } catch (error) {
        console.error('Error getting the product by Id: ', error);
        return rejectWithValue(error.message);
    }
})

const initialState = {
    isLoading: false, 
    error: false,
    loaded: false, 
    data: {
        allProd: [],
        singleProd: []
    },
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
                state.data.allProd = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false; 
                state.error = true;
            })
            .addCase(getProductById.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loaded = true;
                state.data.singleProd = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false; 
                state.error = true;
            }) 
            .addCase(getProductByCategory.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loaded = true;
                state.data.allProd = action.payload;
            })
            .addCase(getProductByCategory.rejected, (state, action) => {
                state.isLoading = false; 
                state.error = true;
            })
    }
});

export default productSlice.reducer;
export const productError = state => state.products.error;
export const loadingProducts = state => state.products.isLoading;
export const productsReturned = state => state.products.data.allProd;
export const singleProdReturned = state => state.products.data.singleProd;

