import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL } from "../constants/constants";

const API_URL = `${URL}/api/v1`;
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    },
});

// Fetch all facture
export const fetchAllFacture = createAsyncThunk(
    "factures/fetchAll",
    async (name) => {
        const response = await instance.get(`/factures?nom=${name}`);
        return response.data;
    }
);

// Fetch one facture
export const fetchOneFacture = createAsyncThunk(
    "factures/fetchOne",
    async (id) => {
        const response = await instance.get(`/factures/${id}`);
        return response.data;
    }
);

// Add a new factures
export const addFacture = createAsyncThunk("factures/add", async (facture) => {
    try {
        const response = await instance.post(`/factures`, facture);
        return response.data;
    } catch (error) {
        const errorMessages = error.response.data.errors;
        throw new Error(errorMessages);
    }
});

// Delete a  facture
export const deleteFacture = createAsyncThunk("factures/delete", async (id) => {
    const response = await instance.delete(`/factures/${id}`);
    return { id, data: response.data };
});

// Update one facture
export const UpdateOneFacture = createAsyncThunk(
    "factures/updateFacture",
    async ([id, facture]) => {
        try {
            const response = await instance.put(`/factures/${id}`, facture);
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
    statusAddFacture: "",
    statusUpdateFacture: "",
    facture: {
        prix_total: "",
        reference: "",
        date_creation: "",
        date_experation: "",
        status: "",
        mode_payment: "",
        client_email: "",
        biens: [],
        user_id: user?.id || "",
    },
    error: null,
    searchFacture: "",
};

const factureSlice = createSlice({
    name: "factures",
    initialState,
    reducers: {
        setNameFacture: (state, { payload }) => {
            state.searchFacture = payload.searchFacture;
        },
        clearFactureUpdate: (state) => {
            state.facture = initialState.facture;
        },

        handleFactureForm: (state, { payload }) => {
            const { name, value } = payload;
            state.facture[name] = value;
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
        setReference: (state, { payload }) => {
            state.facture.reference = payload.finalResult;
        },
        clearBiensFac: (state) => {
            state.facture.biens = initialState.facture.biens;
        },
        addBienToFacture: (state, { payload }) => {
            if (!state.facture.biens.includes(payload.id)) {
                state.facture.biens.push(payload.id);
            }
        },
        setFacturePrice: (state, { payload }) => {
            state.facture.prix_total = payload.price;
        },
        setEmailFac: (state, { payload }) => {
            state.facture.client_email = payload.email;
        },
        setReference: (state, { payload }) => {
            state.facture.reference = "#0000" + payload.id;
        },
        initialStatus: (state) => {
            state.statusUpdateFacture = initialState.statusUpdateFacture;
            state.statusAddFacture = initialState.statusAddFacture;
        },
        setGlobalStatus: (state) => {
            state.status = initialState.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFacture.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllFacture.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.data = action.payload;
            })
            .addCase(fetchAllFacture.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneFacture.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneFacture.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.facture = action.payload;

                action.payload.biens.map((bien) => {
                    state.facture.biens.push(bien.id);
                });

                state.facture.biens = state.facture.biens.filter((bien) => {
                    if (!bien?.NomBien) {
                        return bien;
                    }
                });
            })
            .addCase(fetchOneFacture.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addFacture.pending, (state) => {
                state.statusAddFacture = "loading";
            })
            .addCase(addFacture.fulfilled, (state, { payload }) => {
                state.statusAddFacture = "succeeded";
                if (state.data.factures !== []) {
                    state.data.factures = [
                        ...state.data.factures,
                        payload.data,
                    ];
                } else {
                    state.data.factures = [payload.data];
                }

                state.facture = initialState.facture;
                state.data.count = state.data.count + 1;
            })
            .addCase(addFacture.rejected, (state, action) => {
                state.statusAddFacture = "failed";
                state.error = action.error.message;
            })
            .addCase(UpdateOneFacture.pending, (state) => {
                state.statusUpdateFacture = "loading";
            })
            .addCase(UpdateOneFacture.fulfilled, (state, { payload }) => {
                const index = state.data.factures.findIndex(
                    (element) => element.id === state.facture.id
                );
                state.data.factures[index] = state.facture;
                state.facture = initialState.facture;
                state.statusUpdateFacture = "succeeded";
            })
            .addCase(UpdateOneFacture.rejected, (state, action) => {
                state.statusUpdateFacture = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteFacture.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteFacture.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                const { id } = payload;
                state.data.factures = state.data.factures.filter((facture) => {
                    return facture.id !== id;
                });
                state.data.count = state.data.count - 1;
            })
            .addCase(deleteFacture.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    clearFactureUpdate,
    closeAlert,
    closeAlertUpdate,
    handleFactureForm,
    setNameFacture,
    showAlert,
    showAlertUpdate,
    setReference,
    addBienToFacture,
    setFacturePrice,
    clearBiensFac,
    initialStatus,
    setGlobalStatus,
    setEmailFac,
} = factureSlice.actions;
export default factureSlice.reducer;
