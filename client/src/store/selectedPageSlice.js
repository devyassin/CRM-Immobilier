import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedPage: "Dashboard",
};

const selectedPageSlice = createSlice({
    name: "selectedPage",
    initialState,
    reducers: {
        setPageName: (state, { payload }) => {
            state.selectedPage = payload.name;
        },
    },
});

export const {setPageName} = selectedPageSlice.actions;
export default selectedPageSlice.reducer;
