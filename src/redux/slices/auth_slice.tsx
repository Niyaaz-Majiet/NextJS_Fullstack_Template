import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { setCookie } from 'cookies-next';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: "auth",
    storage: storage,
  };

const initialState = {
    isLoggedIn: false,
    user: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state: any) => {
            state.isLoggedIn = false;
            state.user = {};
        },
        login: (state: any, action: any) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
    },
});



export const loginUser = (user: any) => async (dispatch: any) => {
    setCookie("loggedIn", true);
    await dispatch(login(user));
};

export const logoutUser = () => async (dispatch: any) => {
    setCookie("loggedIn", false);
    await dispatch(logout());
};

export const { logout, login } =
    authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

export default persistReducer(persistConfig,authSlice.reducer);