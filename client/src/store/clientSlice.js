import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/v1";

// Fetch all clients
export const fetchAllClients = createAsyncThunk(
    "clients/fetchAll",
    async (name) => {
        const response = await axios.get(`${API_URL}/clients?name=${name}`);
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

// Add a new client
export const addClient = createAsyncThunk("clients/add", async (client) => {
    const response = await axios.post(`${API_URL}/clients`, client);
    return response.data;
});

// Delete a  client
export const deleteClient = createAsyncThunk("clients/delete", async (id) => {
    const response = await axios.delete(`${API_URL}/clients/${id}`);
    return response.data;
});

const initialState = {
    data: [],
    status: "idle",
    client: {
        nom: "",
        prenom: "",
        type: "",
        tel: "",
        address: "",
        email: "",
        last_contacted: "",
        user_id: 1,
    },
    error: null,
    searchClient: "",
};

const clientSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        setNameClient: (state, { payload }) => {
            state.searchClient = payload.searchClient;
        },
        clearClientUpdate: (state) => {
            state.client = initialState.client;
        },

        handleClientForm: (state, { payload }) => {
            const { name, value } = payload;
            state.client[name] = value;
        },
    },
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
                console.log(action.payload);
                state.client = action.payload;
            })
            .addCase(fetchOneClient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                console.log(action);
            })
            .addCase(addClient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addClient.fulfilled, (state, {payload}) => {
                state.status = "succeeded";
               console.log(payload);
                // state.data.clients.push(payload.data); // Add the new client to the list
            })
            .addCase(addClient.rejected, (state, action) => {
                state.status = "failed";
                console.log(action.error +"-----");
                state.error = action.error.message;
            })
            .addCase(deleteClient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteClient.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                const id = payload.client.id;
                state.data.clients = state.data.clients.filter((client) => {
                    return client.id !== id;
                });
                state.data.count = state.data.count - 1;
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setNameClient, clearClientUpdate, handleClientForm } =
    clientSlice.actions;
export default clientSlice.reducer;
