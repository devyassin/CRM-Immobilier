import { configureStore } from "@reduxjs/toolkit";
import selectedPageSlice from "./selectedPageSlice";
import overlaySlice from "./overlaySlice";

const store = configureStore({
    reducer: {
        selectedPage: selectedPageSlice,
        overlay: overlaySlice,
    },
});

export default store;
