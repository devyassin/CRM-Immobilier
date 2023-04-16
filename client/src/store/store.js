import { configureStore } from "@reduxjs/toolkit";
import selectedPageSlice from "./selectedPageSlice";
import overlaySlice from "./overlaySlice";
import clientSlice from "./clientSlice";
import userSlice from "./userSlice";
import leadSlice from "./leadSlice";

const store = configureStore({
    reducer: {
        selectedPage: selectedPageSlice,
        overlay: overlaySlice,
        clients: clientSlice,
        leads: leadSlice,
        user: userSlice,
    },
});

export default store;
