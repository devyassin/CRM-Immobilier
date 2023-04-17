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

// Fetch all taches with status En cours
export const fetchAllTachesEnCours = createAsyncThunk(
    "status/fetchAllTachesEnCours",
    async () => {
        const response = await instance.get(`/taches?status=En cours`);
        return response.data;
    }
);

// Fetch all taches with status Terminé
export const fetchAllTachesTermine = createAsyncThunk(
    "status/fetchAllTachesTermine",
    async () => {
        const response = await instance.get(`/taches?status=Terminé`);
        return response.data;
    }
);
// Fetch all taches with status À faire
export const fetchAllTachesAfaire = createAsyncThunk(
    "status/fetchAllTachesAfaire",
    async () => {
        const response = await instance.get(`/taches?status=À faire`);
        return response.data;
    }
);

// Fetch one tache
export const fetchOneTache = createAsyncThunk("taches/fetchOne", async (id) => {
    const response = await instance.get(`/taches/${id}`);
    return response.data;
});

// Add a new tache
export const addTache = createAsyncThunk("taches/add", async (tache) => {
    try {
        const response = await instance.post(`/taches`, tache);
        return response.data;
    } catch (error) {
        const errorMessages = error.response.data.errors;
        throw new Error(errorMessages);
    }
});

// Delete a  tache
export const deleteTache = createAsyncThunk("taches/delete", async (id) => {
    const response = await instance.delete(`/taches/${id}`);
    return response.data;
});

// Update one tache
export const UpdateOneTache = createAsyncThunk(
    "leads/updateOne",
    async ([id, tache]) => {
        try {
            const response = await instance.put(`/taches/${id}`, tache);
            return response.data;
        } catch (error) {
            const errorMessages = error.response.data.errors;
            throw new Error(errorMessages);
        }
    }
);

const initialState = {
    todo: [],
    progress: [],
    done: [],
    status: "idle",
    statusTodo: "idle",
    statusInprogress: "idle",
    statusDone: "idle",
    showAlert: false,
    showAlertUpdate: false,
    statusAddTache: "",
    statusUpdateTache: "",
    tache: {
        title: "",
        status: "",
        description: "",
        deadline: "",
        email: "",
        user_id: user?.id || "",
    },
    error: null,
};

const tacheSlice = createSlice({
    name: "taches",
    initialState,
    reducers: {
        clearTacheUpdate: (state) => {
            state.tache = initialState.tache;
        },

        handleLeadForm: (state, { payload }) => {
            const { name, value } = payload;
            state.tache[name] = value;
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTachesAfaire.pending, (state) => {
                state.statusTodo = "loading";
            })
            .addCase(fetchAllTachesAfaire.fulfilled, (state, action) => {
                state.statusTodo = "succeeded";
                state.todo = action.payload;
            })
            .addCase(fetchAllTachesAfaire.rejected, (state, action) => {
                state.statusTodo = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchAllTachesEnCours.pending, (state) => {
                state.statusInprogress = "loading";
            })
            .addCase(fetchAllTachesEnCours.fulfilled, (state, action) => {
                state.statusInprogress = "succeeded";
                state.progress = action.payload;
            })
            .addCase(fetchAllTachesEnCours.rejected, (state, action) => {
                state.statusInprogress = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchAllTachesTermine.pending, (state) => {
                state.statusDone = "loading";
            })
            .addCase(fetchAllTachesTermine.fulfilled, (state, action) => {
                state.statusDone = "succeeded";
                state.done = action.payload;
            })
            .addCase(fetchAllTachesTermine.rejected, (state, action) => {
                state.statusDone = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneTache.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneTache.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tache = action.payload;
            })
            .addCase(fetchOneTache.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addTache.pending, (state) => {
                state.statusAddTache = "loading";
            })
            .addCase(addTache.fulfilled, (state, { payload }) => {
                state.statusAddTache = "succeeded";
                if (state.tache.status === "À faire") {
                    state.todo.taches = [...state.todo.taches, state.tache];
                    state.todo.count = state.todo.count + 1;
                } else if (state.tache.status === "En cours") {
                    state.progress.taches = [
                        ...state.progress.taches,
                        state.tache,
                    ];
                    state.progress.count = state.progress.count + 1;
                } else {
                    state.done.taches = [...state.done.taches, state.tache];
                    state.done.count = state.done.count + 1;
                }

                state.lead = initialState.lead;
            })
            .addCase(addTache.rejected, (state, action) => {
                state.statusAddTache = "failed";
                state.error = action.error.message;
            })
            .addCase(UpdateOneTache.pending, (state) => {
                state.statusUpdateLead = "loading";
            })
            .addCase(UpdateOneTache.fulfilled, (state, { payload }) => {
                const index = state.data.leads.findIndex(
                    (element) => element.id === state.lead.id
                );
                state.data.leads[index] = state.lead;
                state.statusUpdateLead = "succeeded";
            })
            .addCase(UpdateOneTache.rejected, (state, action) => {
                state.statusUpdateLead = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteTache.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteTache.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                const id = payload.lead.id;
                state.data.leads = state.data.leads.filter((lead) => {
                    return lead.id !== id;
                });
                state.data.count = state.data.count - 1;
            })
            .addCase(deleteTache.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default tacheSlice.reducer;
