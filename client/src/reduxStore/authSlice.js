import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, signinUser, logout } from '../apis/apiRequest';

export const registerUser = createAsyncThunk('auth/registerUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await register(credentials);
        if (!response.success) {
            console.warn(`Unbale to register user due to: ${response.message}`);
            return rejectWithValue(response.message);
        }

        return response;
    } catch (error) {
        console.error('Error registering user', error);
        return rejectWithValue(error.message);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await signinUser(credentials);
        console.log(response);
        if (!response.user) {
            console.warn(`Unable to signin user due to: ${response.message}`);
            return rejectWithValue(response.message);
        } else {
                      
            return response;
        }
    } catch (error) {
        console.error('Error logging in user: ', error);
        return rejectWithValue(error.message);
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await logout();
        console.log(response);

        if (!response.success) {

            console.warn(`Something when wrong logging out: ${response.message}`);
            return rejectWithValue(response.message);

        } else {

            return response;

        }
    } catch (error) {
        console.error('Error loging out: ' , error);
        return rejectWithValue(error.message);
    }
})

const initialState = {
    isUserLoading: false,
    isRegistered: false,
    isAuthenticated: false,
    error: false,
    data: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isUserLoading = true;
                state.error = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isRegistered = true;  
                state.data = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isUserLoading = false;
                state.error = true;
                state.data = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.isUserLoading = true;
                state.error = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isAuthenticated = true;
                state.data = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isUserLoading = false;
                state.error = true;
                state.data = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isUserLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isAuthenticated = false;
                state.data = [];
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isUserLoading = false;
                state.error = action.payload.message;
            })
    }
});

export default authSlice.reducer;
export const authData = state => state.auth.data;
export const userAuthLoading = state => state.auth.isUserLoading;
export const userAuthError = state => state.auth.error;
export const userAuthDone = state => state.auth.isAuthenticated;
export const userRegDone = state => state.auth.isRegistered;
