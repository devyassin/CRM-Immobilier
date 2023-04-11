import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
};

const overlaySlice = createSlice({
    name: "overlay",
    initialState,
    reducers: {
        show: (state) => {
            state.show = true;
        },
        hide: (state) => {
            state.show = false;
        },
        toggle: (state) => {
            state.show = !state.show;
        },
    },
});
export const { show, hide, toggle } = overlaySlice.actions;
export default overlaySlice.reducer;
