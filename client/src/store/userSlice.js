import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants/constants";

const API_URL = `${URL}/api`;
console.log(API_URL);
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

//logout

export const logoutUser = createAsyncThunk("user/logout", async (user) => {
    try {
        const response = await axios.post(`${API_URL}/logout`);
        return response.data;
    } catch (error) {
        const errorMessages = error.response.data.errors;
        throw new Error(errorMessages);
    }
});

const initialState = {
    user: user ? user : null,
    token: token ? token : null,
    showAlertLogin: false,
    statusLogin: "",
    statusLogout: "",
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
        setUserAndToken: (state, { payload }) => {
            const { user, token } = payload;
            state.user = user;
            state.token = token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.statusLogin = "loading";
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.statusLogin = "succeeded";
                localStorage.setItem("user", JSON.stringify(payload.user));
                localStorage.setItem("token", payload.token);
                state.user = payload.user;
                state.token = payload.token;
            })
            .addCase(loginUser.rejected, (state) => {
                state.statusLogin = "failed";
                state.error = "Email ou mot de passe incorrect";
            })
            .addCase(logoutUser.pending, (state) => {
                state.statusLogout = "loading";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.statusLogout = "succeeded";
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("route");
                localStorage.removeItem("routed");
            })
            .addCase(logoutUser.rejected, (state) => {
                state.statusLogout = "failed";
                state.error = "Logout echoué";
            });
    },
});

export const { showAlert, closeAlert, setUserAndToken } = userSlice.actions;
export default userSlice.reducer;
