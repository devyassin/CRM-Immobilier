import { configureStore } from "@reduxjs/toolkit";
import selectedPageSlice from "./selectedPageSlice";

const store = configureStore({
    reducer: {
        selectedPage: selectedPageSlice,
    },
});

export default store;
