import { createSlice } from '@reduxjs/toolkit';

export const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        forgotPassword: null,
        changePassword: null,
        activate: null,
    },
    reducers: {
        setForgotPassword: (state) => {
            state.forgotPassword = true;
        },
        setChangePassword: (state) => {
            state.changePassword = true;
        },
        setActivate: (state) => {
            state.activate = true;
        },
        delForgotPassword: (state) => {
            state.forgotPassword = null;
        },
        delChangePassword: (state) => {
            state.changePassword = null;
        },
        delActivate: (state) => {
            state.activate = null;
        },
    },
});

export const { setForgotPassword,setChangePassword,setActivate,delActivate,delChangePassword,delForgotPassword } = servicesSlice.actions;

export const selectForgotPassword = state => state.services.forgotPassword;
export const selectChangePassword = state => state.services.changePassword;
export const selectActivate = state => state.services.activate;

export default servicesSlice.reducer;
