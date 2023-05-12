import { configureStore } from "@reduxjs/toolkit";
import selectedPageSlice from "./selectedPageSlice";
import overlaySlice from "./overlaySlice";
import clientSlice from "./clientSlice";
import userSlice from "./userSlice";
import leadSlice from "./leadSlice";
import tacheSlice from "./tacheSlice";
import bienSlice from "./bienSlice";
import devisSlice from "./devisSlice";
import bonsSlice from "./BonSlice";
import factureSlice from "./factureSlice";

const store = configureStore({
    reducer: {
        selectedPage: selectedPageSlice,
        overlay: overlaySlice,
        clients: clientSlice,
        leads: leadSlice,
        biens: bienSlice,
        taches: tacheSlice,
        devis: devisSlice,
        bons: bonsSlice,
        factures: factureSlice,
        user: userSlice,
    },
});

export default store;
