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

// Fetch all devis
export const fetchAllDevis = createAsyncThunk(
    "devis/fetchAll",
    async (name) => {
        const response = await instance.get(`/devis?nom=${name}`);
        return response.data;
    }
);

// Fetch one devis
export const fetchOneDevis = createAsyncThunk("devis/fetchOne", async (id) => {
    const response = await instance.get(`/devis/${id}`);
    return response.data;
});

// Add a new devis
export const addDevis = createAsyncThunk("devis/add", async (devis) => {
    try {
        const response = await instance.post(`/devis`, devis);
        return response.data;
    } catch (error) {
        const errorMessages = error.response.data.errors;
        throw new Error(errorMessages);
    }
});

// Delete a  devis
export const deleteDevis = createAsyncThunk("devis/delete", async (id) => {
    const response = await instance.delete(`/devis/${id}`);
    return { id, data: response.data };
});

// Update one devis
export const UpdateOneDevis = createAsyncThunk(
    "devis/updateDevis",
    async ([id, devis]) => {
        try {
            const response = await instance.put(`/devis/${id}`, devis);
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
    statusAddDevis: "",
    statusUpdateDevis: "",
    devis: {
        estimation: "",
        reference: "",
        date_creation: "",
        date_experation: "",
        client_email: "",
        biens: [],
        user_id: user?.id || "",
    },
    error: null,
    searchDevis: "",
};

const devisSlice = createSlice({
    name: "devis",
    initialState,
    reducers: {
        setNameDevis: (state, { payload }) => {
            state.searchDevis = payload.searchDevis;
        },
        clearDevisUpdate: (state) => {
            state.devis = initialState.devis;
        },

        handleDevisForm: (state, { payload }) => {
            const { name, value } = payload;
            state.devis[name] = value;
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
            state.devis.reference = payload.finalResult;
        },
        clearBiens: (state, { payload }) => {
            const biens = payload.biens;

            biens.biens.map((bien) => {
                if (
                    bien.exict === "local" &&
                    state.devis.biens.includes(bien.id)
                ) {
                    let index = state.devis.biens.indexOf(bien.id);

                    state.devis.biens.splice(index, 1);
                }
            });
            // need some changes
            // state.devis.biens = initialState.devis.biens;
        },
        addBienToDevis: (state, { payload }) => {
            if (!state.devis.biens.includes(payload.id)) {
                state.devis.biens.push(payload.id);
            }
        },
        removeBienFromDevis: (state, { payload }) => {
            if (state.devis.biens.includes(payload)) {
                let index = state.devis.biens.indexOf(payload);

                state.devis.biens.splice(index, 1);
            }
        },
        setDevisEstimation: (state, { payload }) => {
            state.devis.estimation = payload.price;
        },
        setEmail: (state, { payload }) => {
            console.log(payload.email);
            state.devis.client_email = payload.email;
        },
        setReference: (state, { payload }) => {
            state.devis.reference = "#0000" + payload.id;
        },
        initialStatus: (state) => {
            state.statusUpdateDevis = initialState.statusUpdateDevis;
            state.statusAddDevis = initialState.statusAddDevis;
        },
        setGlobalStatus: (state) => {
            state.status = initialState.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDevis.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllDevis.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchAllDevis.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneDevis.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneDevis.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.devis = action.payload;

                action.payload.biens.map((bien) => {
                    state.devis.biens.push(bien.id);
                });

                state.devis.biens = state.devis.biens.filter((bien) => {
                    if (!bien?.NomBien) {
                        return bien;
                    }
                });
            })
            .addCase(fetchOneDevis.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addDevis.pending, (state) => {
                state.statusAddDevis = "loading";
            })
            .addCase(addDevis.fulfilled, (state, { payload }) => {
                state.statusAddDevis = "succeeded";
                state.data.devis = [...state.data.devis, payload.data];
                state.devis = initialState.devis;
                state.data.count = state.data.count + 1;
            })
            .addCase(addDevis.rejected, (state, action) => {
                state.statusAddDevis = "failed";
                state.error = action.error.message;
            })
            .addCase(UpdateOneDevis.pending, (state) => {
                state.statusUpdateDevis = "loading";
            })
            .addCase(UpdateOneDevis.fulfilled, (state, { payload }) => {
                const index = state.data.devis.findIndex(
                    (element) => element.id === state.devis.id
                );
                state.data.devis[index] = state.devis;
                state.devis = initialState.devis;
                state.statusUpdateDevis = "succeeded";
            })
            .addCase(UpdateOneDevis.rejected, (state, action) => {
                state.statusUpdateDevis = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteDevis.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteDevis.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                const { id } = payload;
                state.data.devis = state.data.devis.filter((devi) => {
                    return devi.id !== id;
                });
                state.data.count = state.data.count - 1;
            })
            .addCase(deleteDevis.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    clearDevisUpdate,
    closeAlert,
    closeAlertUpdate,
    handleDevisForm,
    setNameDevis,
    showAlert,
    showAlertUpdate,
    setReference,
    addBienToDevis,
    removeBienFromDevis,
    setDevisEstimation,
    clearBiens,
    initialStatus,
    setEmail,
    setGlobalStatus,
} = devisSlice.actions;
export default devisSlice.reducer;
