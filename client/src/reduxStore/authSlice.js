import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, signinUser, logout, checkLogin } from '../apis/apiRequest';

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
});

export const checkUser = createAsyncThunk('auth/checkUser', async (_, { rejectWithValue }) => {
    try {
        const response = await checkLogin();

        if(response.success) {

            const user = {
                user: {
                    id: response.data,
                }
                
            };

            return user;
        } else {
            return rejectWithValue(response);
        }
    } catch (error) {
        console.error('Error checking login: ', error);
        return rejectWithValue(error.message);
    }
});

const initialState = {
    isUserLoading: false,
    isRegistered: false,
    isAuthenticated: false,
    errorLogin: false,
    errorRegister: false,
    errorData: [],
    errorReg: [],
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
                state.errorRegister = true;
                state.errorReg = action.payload;
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
                state.errorLogin = true;
                state.errorData = action.payload;
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
            .addCase(checkUser.pending, (state) => {
                state.isUserLoading = true;
                state.error = false;
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.isAuthenticated = true;  
                state.data = action.payload;
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.isUserLoading = false;
                //state.errorLogin = true;
                //state.errorData = action.payload;
            })
    }
});

export default authSlice.reducer;
export const authData = state => state.auth.data;
export const userAuthLoading = state => state.auth.isUserLoading;
export const userAuthError = state => state.auth.errorLogin;
export const userRegisterError = state => state.auth.errorRegister;
export const userAuthDone = state => state.auth.isAuthenticated;
export const userRegDone = state => state.auth.isRegistered;
export const errorData = state => state.auth.errorData;
export const errorReg = state => state.auth.errorReg;
