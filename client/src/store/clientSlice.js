import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/v1";

// Fetch all clients
export const fetchAllClients = createAsyncThunk(
    "clients/fetchAll",
    async () => {
        const response = await axios.get(`${API_URL}/clients`);
        return response.data;
    }
);

// Fetch one client
export const fetchOneClient = createAsyncThunk(
    "clients/fetchOne",
    async (id) => {
        const response = await axios.get(`${API_URL}/clients/${id}`);
        return response.data;
    }
);

const initialState = { data: [], status: "idle", error: null };

const clientSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllClients.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllClients.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchAllClients.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneClient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneClient.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchOneClient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default clientSlice.reducer;
