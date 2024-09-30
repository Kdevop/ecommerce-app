import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, userChanges } from '../apis/apiRequest';

export const userDetails = createAsyncThunk('user/userDetails', async (_, {rejectWithValue}) => {
    try {
        const response = await getUser();

        if (!response.success) {
            console.warn(`Unable to get userDetails due to: ${response.message}`);
            return rejectWithValue(response.message);
        }

        return response;
        
    } catch (error) {
        console.warn(`Error getting user details:` , error);
        return rejectWithValue(error);
    }
});

export const updateDetails = createAsyncThunk('user/updateDetails', async (credentials, {rejectWithValue}) => {
    
    console.log(`These are the credenitals in updateDetails ${credentials}`);

    try {
        const response = await userChanges(credentials);

        if (!response.success) {
            console.warn(`Something went wrong changing your details: ${response.message}`);
            return rejectWithValue(response.message);
        } else {
            return response;
        }

    } catch (error) {
        console.error('Error changing details: ', error);
        return rejectWithValue(error.message);
    }
});


const initialState = {
    updateUserInit: false,
    userUpdated: false,
    fetchingUser: false, 
    userReturned: false, 
    userData: false,
    userAddress: false, 
    data: {
        userData: [],
        userAddress: [],
    },
    userError: false
};

const userSlice = createSlice({
    name: 'user', 
    initialState, 
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(userDetails.pending, (state) => {
                state.fetchingUser = true;
            })
            .addCase(userDetails.fulfilled, (state, action) => {
                state.fetchingUser = false;
                state.userReturned = true;
                state.userData = action.payload.user;
                state.userAddress = action.payload.address;
                state.data.userData = action.payload.userData;
                state.data.userAddress = action.payload.addressData;
            })
            .addCase(userDetails.rejected, (state, action) => {
                state.fetchingUser = false;
                state.userError = true;
            })
            .addCase(updateDetails.pending, (state) => {
                state.updateUserInit = true;
            })
            .addCase(updateDetails.fulfilled, (state, action) => {
                state.updateUserInit = false;
                state.userUpdated = true;
                state.data.userData = action.payload.data;
            })
            .addCase(updateDetails.rejected, (state) => {
                state.updateUserInit = false;
                state.userError = true;
            })
    }
});

export default userSlice.reducer;
export const userData = state => state.user.data.userData;
export const addressData = state => state.user.data.userAddress;
export const userReturned = state => state.user.userReturned;
export const userDataReturned = state => state.user.userData;
export const addressReturned = state => state.user.userAddress;
export const userError = state => state.user.userError;
export const updatedUser = state => state.userUpdated;