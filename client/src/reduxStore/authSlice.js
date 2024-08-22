import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../apis/apiRequest';

export const registerUser = createAsyncThunk('auth/registerUser', async (credentials ,  { rejectWithValue }) => {
    try {
        const response = await register(credentials);
        if(!response.success) {
            console.warn(`Unbale to register user due to: ${response.message}`);
            return rejectWithValue(response.message);
        }

        return response;
    } catch (error) {
        console.error('Error registering user', error);
        return rejectWithValue(error.message);
    }
});

const initialState = {
    isRegistering: false, 
    isAuthenticated: false, 
    error: null, 
    data: []
};

const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isRegistering = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isRegistering = false;
                state.isAuthenticated = true;
                state.data = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isRegistering = false;
                state.error = action.payload;
            })
    }
});

export default authSlice.reducer;
export const registerData = state => state.auth.data;
export const registering = state => state.auth.isRegistering;
export const registerError = state => state.auth.error;
 