import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/v1";
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    },
});

// Fetch all bons
export const fetchAllBons = createAsyncThunk("bons/fetchAll", async (name) => {
    const response = await instance.get(`/bons?nom=${name}`);
    return response.data;
});

// Fetch one bons
export const fetchOneBon = createAsyncThunk("bons/fetchOne", async (id) => {
    const response = await instance.get(`/bons/${id}`);
    return response.data;
});

// Add a new bons
export const addBon = createAsyncThunk("bons/add", async (bons) => {
    try {
        const response = await instance.post(`/bons`, bons);
        return response.data;
    } catch (error) {
        const errorMessages = error.response.data.errors;
        throw new Error(errorMessages);
    }
});

// Delete a  bons
export const deleteBon = createAsyncThunk("bons/delete", async (id) => {
    const response = await instance.delete(`/bons/${id}`);
    return { id, data: response.data };
});

// Update one bons
export const UpdateOneBon = createAsyncThunk(
    "bons/updateBon",
    async ([id, bon]) => {
        try {
            const response = await instance.put(`/bons/${id}`, bon);
            return response.data;
        } catch (error) {
            const errorMessages = error.response.data.errors;
            throw new Error(errorMessages);
        }
    }
);

const initialState = {
    data: [],
    status: "idle",
    showAlert: false,
    showAlertUpdate: false,
    statusAddBon: "",
    statusUpdateBon: "",
    bon: {
        date_visite: "",
        lead_email: "",
        raison: "",
        accompagnateur: "",
        NomBien: "",
        user_id: user?.id || "",
    },
    error: null,
    searchBon: "",
};

const bonsSlice = createSlice({
    name: "bons",
    initialState,
    reducers: {
        setNameBon: (state, { payload }) => {
            state.searchBon = payload.searchBon;
        },
        clearBonUpdate: (state) => {
            state.bon = initialState.bon;
        },

        handleBonForm: (state, { payload }) => {
            const { name, value } = payload;
            state.bon[name] = value;
        },

        showAlert: (state) => {
            state.showAlert = true;
        },
        closeAlert: (state) => {
            state.showAlert = false;
        },
        showAlertUpdate: (state) => {
            state.showAlertUpdate = true;
        },
        closeAlertUpdate: (state) => {
            state.showAlertUpdate = false;
        },

        setEmail: (state, { payload }) => {
            state.bon.lead_email = payload.email;
        },
        setBienName: (state, { payload }) => {
            state.bon.NomBien = payload.NomBien;
        },
        setBienId: (state, { payload }) => {
            state.bon.bien_id = payload.id;
        },
        initialStatus: (state) => {
            state.statusUpdateBon = initialState.statusUpdateBon;
            state.statusAddBon = initialState.statusAddBon;
        },
        setGlobalStatus: (state) => {
            state.status = initialState.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBons.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllBons.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchAllBons.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneBon.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneBon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bon = action.payload;
            })
            .addCase(fetchOneBon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addBon.pending, (state) => {
                state.statusAddBon = "loading";
            })
            .addCase(addBon.fulfilled, (state, { payload }) => {
                state.statusAddBon = "succeeded";
                state.data.bons = [...state.data.bons, payload.data];
                state.bon = initialState.bon;
                state.data.count = state.data.count + 1;
            })
            .addCase(addBon.rejected, (state, action) => {
                state.statusAddBon = "failed";
                state.error = action.error.message;
            })
            .addCase(UpdateOneBon.pending, (state) => {
                state.statusUpdateBon = "loading";
            })
            .addCase(UpdateOneBon.fulfilled, (state, { payload }) => {
                const index = state.data.bons.findIndex(
                    (element) => element.id === state.bon.id
                );
                state.data.bons[index] = state.bon;
                state.bon = initialState.bon;
                state.statusUpdateBon = "succeeded";
            })
            .addCase(UpdateOneBon.rejected, (state, action) => {
                state.statusUpdateBon = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteBon.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteBon.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                const { id } = payload;
                state.data.bons = state.data.bons.filter((bon) => {
                    return bon.id !== id;
                });
                state.data.count = state.data.count - 1;
            })
            .addCase(deleteBon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    clearBonUpdate,
    closeAlert,
    closeAlertUpdate,
    handleBonForm,
    initialStatus,
    setEmail,
    setNameBon,
    setBienName,
    showAlert,
    setBienId,
    showAlertUpdate,
    setGlobalStatus,
} = bonsSlice.actions;
export default bonsSlice.reducer;
