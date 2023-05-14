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

// Fetch all transactions
export const fetchAllTransactions = createAsyncThunk(
    "transactions/fetchAll",
    async () => {
        const response = await instance.get(`/transactions`);
        return response.data;
    }
);

// Fetch one transaction
export const fetchOneTransaction = createAsyncThunk(
    "transactions/fetchOne",
    async (id) => {
        const response = await instance.get(`/transactions/${id}`);
        return response.data;
    }
);

// Add a new transaction
export const addTransaction = createAsyncThunk(
    "transactions/add",
    async (transaction) => {
        try {
            const response = await instance.post(`/transactions`, transaction);
            return response.data;
        } catch (error) {
            const errorMessages = error.response.data.errors;
            throw new Error(errorMessages);
        }
    }
);

// Delete a  transaction
export const deleteTransaction = createAsyncThunk(
    "transactions/delete",
    async (id) => {
        const response = await instance.delete(`/transactions/${id}`);
        return response.data;
    }
);

// Update one transaction
export const UpdateOneTransaction = createAsyncThunk(
    "transactions/updateOne",
    async ([id, transaction]) => {
        try {
            const response = await instance.put(
                `/transactions/${id}`,
                transaction
            );
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
    statusAddTransaction: "",
    statusUpdateTransaction: "",
    transaction: {
        prix: "",
        mode_payement: "",
        comission: "",
        type: "",
        date_transaction: "",
        bien_id: "",
        user_id: user?.id || "",
    },
    error: null,
    searchClient: "",
};

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        handleTransactionForm: (state, { payload }) => {
            const { name, value } = payload;
            state.transaction[name] = value;
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
            state.statusUpdateTransaction =
                initialState.statusUpdateTransaction;
            state.statusAddTransaction = initialState.statusAddTransaction;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTransactions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllTransactions.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchAllTransactions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneTransaction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneTransaction.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.transaction = action.payload;
            })
            .addCase(fetchOneTransaction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addTransaction.pending, (state) => {
                state.statusAddTransaction = "loading";
            })
            .addCase(addTransaction.fulfilled, (state, { payload }) => {
                state.statusAddTransaction = "succeeded";
                state.data.transactions = [
                    ...state.data.transactions,
                    state.transaction,
                ];
                state.transaction = initialState.transaction;
                state.data.count = state.data.count + 1;
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.statusAddTransaction = "failed";
                state.error = action.error.message;
            })
            .addCase(UpdateOneTransaction.pending, (state) => {
                state.statusUpdateTransaction = "loading";
            })
            .addCase(UpdateOneTransaction.fulfilled, (state, { payload }) => {
                const index = state.data.transactions.findIndex(
                    (element) => element.id === state.transaction.id
                );
                state.data.transactions[index] = state.transaction;
                state.statusUpdateTransaction = "succeeded";
            })
            .addCase(UpdateOneTransaction.rejected, (state, action) => {
                state.statusUpdateTransaction = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
                state.status = "succeeded";
                const id = payload.transaction.id;

                state.data.transactions = state.data.transactions.filter(
                    (transaction) => {
                        return transaction.id !== id;
                    }
                );
                state.data.count = state.data.count - 1;
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    closeAlert,
    closeAlertUpdate,
    handleTransactionForm,
    initialStatus,
    showAlert,
    showAlertUpdate,
} = transactionSlice.actions;
export default transactionSlice.reducer;
