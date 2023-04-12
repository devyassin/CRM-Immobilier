import { configureStore } from "@reduxjs/toolkit";
import selectedPageSlice from "./selectedPageSlice";
import overlaySlice from "./overlaySlice";
import clientSlice from "./clientSlice";

const store = configureStore({
    reducer: {
        selectedPage: selectedPageSlice,
        overlay: overlaySlice,
        clients: clientSlice,
    },
});

export default store;
