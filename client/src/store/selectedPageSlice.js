import { createSlice } from "@reduxjs/toolkit";
const selectedPage = localStorage.getItem("route");
const initialState = {
    selectedPage: selectedPage,
};

const selectedPageSlice = createSlice({
    name: "selectedPage",
    initialState,
    reducers: {
        setPageName: (state, { payload }) => {
            state.selectedPage = localStorage.getItem("route");
        },
    },
});

export const { setPageName } = selectedPageSlice.actions;
export default selectedPageSlice.reducer;
