import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api";
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

//login
export const loginUser = createAsyncThunk("user/login", async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user);
        return response.data;
    } catch (error) {
        console.log("error");
        console.log(user);
        const errorMessages = error.response.data.errors;
        throw new Error(errorMessages);
    }
});

const initialState = {
    user: user ? user : null,
    token: token ? token : null,
    showAlertLogin: false,
    statusLogin: "",
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        showAlert: (state) => {
            state.showAlertLogin = true;
        },
        closeAlert: (state) => {
            state.showAlertLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.statusLogin = "loading";
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.statusLogin = "succeeded";
                state.user = payload.user;
                state.token = payload.token;
                localStorage.setItem("user", JSON.stringify(payload.user));
                localStorage.setItem("token", payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.statusLogin = "failed";
                state.error = "Email ou mot de passe incorrect";
            });
    },
});

export const { showAlert, closeAlert } = userSlice.actions;
export default userSlice.reducer;
