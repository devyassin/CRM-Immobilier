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

// Fetch all leads
export const fetchAllLeads = createAsyncThunk(
    "leads/fetchAll",
    async (name) => {
        const response = await instance.get(`/leads?name=${name}`);
        return response.data;
    }
);

// Fetch one lead
export const fetchOneLead = createAsyncThunk("leads/fetchOne", async (id) => {
    const response = await instance.get(`/leads/${id}`);
    return response.data;
});

// Add a new lead
export const addLead = createAsyncThunk("leads/add", async (lead) => {
    try {
        const response = await instance.post(`/leads`, lead);
        return response.data;
    } catch (error) {
        const errorMessages = error.response.data.errors;
        throw new Error(errorMessages);
    }
});

// Delete a  lead
export const deleteLead = createAsyncThunk("leads/delete", async (id) => {
    const response = await instance.delete(`/leads/${id}`);
    return response.data;
});

// Update one lead
export const UpdateOneLead = createAsyncThunk(
    "leads/updateOne",
    async ([id, lead]) => {
        try {
            const response = await instance.put(`/leads/${id}`, lead);
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
    statusAddLead: "",
    statusUpdateLead: "",
    lead: {
        nom: "",
        prenom: "",
        tel: "",
        address: "",
        email: "",
        status: "",
        lead_source: "",
        user_id: user?.id || "",
    },
    error: null,
    searchLead: "",
};

const leadSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        setNameLead: (state, { payload }) => {
            state.searchLead = payload.searchLead;
        },
        clearLeadUpdate: (state) => {
            state.lead = initialState.lead;
        },

        handleLeadForm: (state, { payload }) => {
            const { name, value } = payload;
            state.lead[name] = value;
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
        initialStatus: (state) => {
            state.statusUpdateLead = initialState.statusUpdateLead;
            state.statusAddLead = initialState.statusAddLead;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLeads.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllLeads.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchAllLeads.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneLead.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneLead.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.lead = action.payload;
            })
            .addCase(fetchOneLead.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addLead.pending, (state) => {
                state.statusAddLead = "loading";
            })
            .addCase(addLead.fulfilled, (state, { payload }) => {
                state.statusAddLead = "succeeded";
                state.data.leads = [...state.data.leads, state.lead];
                state.lead = initialState.lead;
                state.data.count = state.data.count + 1;
            })
            .addCase(addLead.rejected, (state, action) => {
                state.statusAddLead = "failed";
                state.error = action.error.message;
            })
            .addCase(UpdateOneLead.pending, (state) => {
                state.statusUpdateLead = "loading";
            })
            .addCase(UpdateOneLead.fulfilled, (state, { payload }) => {
                const index = state.data.leads.findIndex(
                    (element) => element.id === state.lead.id
                );
                state.data.leads[index] = state.lead;
                state.statusUpdateLead = "succeeded";
            })
            .addCase(UpdateOneLead.rejected, (state, action) => {
                state.statusUpdateLead = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteLead.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteLead.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                const id = payload.lead.id;
                state.data.leads = state.data.leads.filter((lead) => {
                    return lead.id !== id;
                });
                state.data.count = state.data.count - 1;
            })
            .addCase(deleteLead.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    setNameLead,
    clearLeadUpdate,
    handleLeadForm,
    showAlert,
    closeAlert,
    showAlertUpdate,
    closeAlertUpdate,
    initialStatus,
} = leadSlice.actions;
export default leadSlice.reducer;
