import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userOrders, orderById } from "../apis/apiRequest";

export const getOrders = createAsyncThunk('orders/getOrders', async (id, {rejectWithValue}) => {
    try{
        const response = await userOrders(id);

        if (!response.success) {
            console.warn(`Unable to retrieve orders: ${response.message}`);
            return rejectWithValue(response.message);
        }
 
        return response;

    } catch (error) {
        console.warn(`Error getting orders: `, error)
        return rejectWithValue(error);
    }
}); 

export const orderDetails = createAsyncThunk('orders/orderDetails', async (id, {rejectWithValue}) => {
    try {
        const response = await orderById(id);

        console.log(response);

        if(!response.success) {
            console.warn(`Unable to get order details: ${response.message}`);
            return rejectWithValue(response.message);
        }

        return response;
    } catch (error) {
        console.error('Error getting the order details: ', error);
        return rejectWithValue(error.message);
    }
})

const initialState = {
    initGetOrders: false,
    ordersReturned: false,
    hasOrders: false, 
    data: {
        allOrders: [],
        singleOrder: {
            checkout: [],
            products: []
        }
    },
    error: false,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.initGetOrders = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.initGetOrders = false;
                state.ordersReturned = true;
                state.hasOrders = action.payload.hasOrders;
                state.data.allOrders = action.payload.data;
            })
            .addCase(getOrders.rejected, (state) => {
                state.initGetOrders = false;
                state.error = false;
            })
            .addCase(orderDetails.pending, (state) => {
                state.initGetOrders = true;
            })
            .addCase(orderDetails.fulfilled, (state, action) => {
                state.initGetOrders = false; 
                state.ordersReturned = true;
                state.data.singleOrder.checkout = action.payload.checkout_data;
                state. data.singleOrder.products = action.payload.products_data;
            })
            .addCase(orderDetails.rejected, (state) => {
                state.initGetOrders = false;
                state.error = true;
            })
    }
});

export default ordersSlice.reducer;
export const orderData = state => state.orders.data.allOrders;
export const prevOrders = state => state.orders.hasOrders;
export const orderDetailsCheckout = state => state.orders.data.singleOrder.checkout;
export const orderDetailsProducts = state => state.orders.data.singleOrder.products;
export const loadingOrders = state => state.orders.initGetOrders;


