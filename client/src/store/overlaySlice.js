import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    showLog: false,
    showFilter: false,
};

const overlaySlice = createSlice({
    name: "overlay",
    initialState,
    reducers: {
        showFilter: (state) => {
            state.showFilter = true;
        },
        hideFilter: (state) => {
            state.showFilter = false;
        },
        toggleFilter: (state) => {
            state.showFilter = !state.show;
        },
        show: (state) => {
            state.show = true;
        },
        showLog: (state) => {
            state.showLog = true;
        },
        hide: (state) => {
            state.show = false;
            state.showLog = false;
        },
        toggle: (state) => {
            state.show = !state.show;
        },
    },
});
export const {
    show,
    hide,
    toggle,
    hideFilter,
    showFilter,
    toggleFilter,
    showLog,
} = overlaySlice.actions;
export default overlaySlice.reducer;
