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

// Fetch all biens
export const fetchAllBiens = createAsyncThunk(
    "biens/fetchAll",
    async ([name, status, price, order, min, max, bienName]) => {
        let queryString = "/biens?";
        if (name !== "") {
            queryString += `client_name=${name}&`;
        }
        if (status !== "") {
            queryString += `status=${status}&`;
        }
        if (price !== "") {
            queryString += `sort=${price}&`;
        }
        if (order) {
            queryString += `order=${order}&`;
        }
        if (min !== "") {
            queryString += `min_price=${min}&`;
        }
        if (bienName === "nonlocal") {
            queryString += `exict=${bienName}&`;
        }
        if (max !== "") {
            queryString += `max_price=${max}&`;
        }
        queryString = queryString.slice(0, -1).replaceAll(",", "");
        console.log(queryString);
        const response = await instance.get(queryString);
        return response.data;
    }
);

// Fetch one bien
export const fetchOneBien = createAsyncThunk("biens/fetchOne", async (id) => {
    const response = await instance.get(`/biens/${id}`);
    return response.data;
});

// Add a new biens
export const addBien = createAsyncThunk("biens/add", async (bien) => {
    try {
        const response = await instance.post(`/biens`, bien);
        return response.data;
    } catch (error) {
        const errorMessages = error.response.data.errors;
        throw new Error(errorMessages);
    }
});

// Delete a  biens
export const deleteBien = createAsyncThunk("biens/delete", async (id) => {
    const response = await instance.delete(`/biens/${id}`);
    return response.data;
});

// Update one biens
export const UpdateOneBien = createAsyncThunk(
    "biens/updateOne",
    async ([id, bien]) => {
        try {
            const response = await instance.put(`/biens/${id}`, bien);
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
    statusAddBien: "",
    statusUpdateBien: "",
    bien: {
        NomBien: "",
        address: "",
        type: "",
        description: "",
        location: "",
        exict: "local",
        price: "",
        status: "",
        comission: "",
        user_id: user?.id || "",
        client_email: "",
    },
    error: null,
    filterName: "",
    filterStatus: "",
    filterPrice: "",
    filterMinPrice: "",
    filterMaxPrice: "",
    filterOrder: "Asc",
};

const bienSlice = createSlice({
    name: "biens",
    initialState,
    reducers: {
        setFilterName: (state, { payload }) => {
            state.filterName = payload.filterName;
        },
        setFilterStatus: (state, { payload }) => {
            if (payload.sortStatus === "Default") {
                state.filterStatus = initialState.filterStatus;
                state.filterOrder = "";
            } else {
                state.filterStatus = payload.sortStatus;
            }
        },

        setFilterPrice: (state) => {
            state.filterPrice = "price";
        },
        setFilterOrder: (state, { payload }) => {
            state.filterOrder = payload.sortOrder;
        },
        setFilterMinPrice: (state, { payload }) => {
            state.filterMinPrice = payload.min;
        },
        setFilterMaxPrice: (state, { payload }) => {
            state.filterMaxPrice = payload.max;
        },
        clearBienUpdate: (state) => {
            state.bien = initialState.bien;
        },

        setEmailCl: (state, { payload }) => {
            state.bien.client_email = payload.email;
            state.bien.exict = "nonlocal";
            state.bien.type = "Autres";
            state.bien.status = "disponible";
            state.bien.location = "random";
            state.bien.address = "random";
        },

        handleBienForm: (state, { payload }) => {
            const { name, value } = payload;

            state.bien[name] = value;
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
            state.statusUpdateBien = initialState.statusUpdateBien;
            state.statusAddBien = initialState.statusAddBien;
        },
        initialStatusTwo: (state) => {
            state.statusUpdateBien = initialState.statusUpdateBien;
            state.statusAddBien = initialState.statusAddBien;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBiens.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllBiens.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchAllBiens.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneBien.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneBien.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.bien = action.payload;
            })
            .addCase(fetchOneBien.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addBien.pending, (state) => {
                state.statusAddBien = "loading";
            })
            .addCase(addBien.fulfilled, (state, { payload }) => {
                state.statusAddBien = "succeeded";
                state.data.biens = [...state.data.biens, payload.data];
                state.bien = initialState.bien;
                state.data.count = state.data.count + 1;
            })
            .addCase(addBien.rejected, (state, action) => {
                state.statusAddBien = "failed";
                state.error = action.error.message;
            })
            .addCase(UpdateOneBien.pending, (state) => {
                state.statusUpdateBien = "loading";
            })
            .addCase(UpdateOneBien.fulfilled, (state, { payload }) => {
                const index = state.data.biens.findIndex(
                    (element) => element.id === state.bien.id
                );
                state.data.biens[index] = state.bien;
                state.statusUpdateBien = "succeeded";
            })
            .addCase(UpdateOneBien.rejected, (state, action) => {
                state.statusUpdateBien = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteBien.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteBien.fulfilled, (state, { payload }) => {
                state.status = "succeeded";

                const id = payload.bien.id;
                state.data.biens = state.data.biens.filter((bien) => {
                    return bien.id !== id;
                });
                state.data.count = state.data.count - 1;
            })
            .addCase(deleteBien.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    setFilterName,
    setFilterOrder,
    setFilterPrice,
    setFilterStatus,
    setFilterMinPrice,
    setFilterMaxPrice,
    setEmailCl,
    clearBienUpdate,
    closeAlert,
    closeAlertUpdate,
    handleBienForm,
    showAlert,
    showAlertUpdate,
    initialStatus,
    initialStatusTwo,
} = bienSlice.actions;

export default bienSlice.reducer;
