import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Login,
    ProtectedRoute,
    Feed,
    Dashborad,
    Clients,
    Calander,
    Devis,
    Bon,
    BonDetail,
    FormBon,
    Biens,
    Taches,
    Facture,
    Error,
    DevisDetail,
    FormDevis,
    FactureDetail,
    FormFacture,
    Leads,
    Transactions,
    TransactionDetail,
} from "./pages";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Feed />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashborad />} />
                    <Route path="dashboard" element={<Dashborad />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="leads" element={<Leads />} />
                    <Route path="biens" element={<Biens />} />
                    <Route path="taches" element={<Taches />} />

                    <Route path="devis">
                        <Route path="/devis" element={<Devis />} />
                        <Route path=":id" element={<DevisDetail />} />
                        <Route
                            path="/devis/FormDevis"
                            element={<FormDevis />}
                        />
                    </Route>
                    <Route path="bons">
                        <Route path="/bons" element={<Bon />} />
                        <Route path=":id" element={<BonDetail />} />
                        <Route path="/bons/FormBon" element={<FormBon />} />
                    </Route>

                    <Route path="facture">
                        <Route path="/facture" element={<Facture />} />
                        <Route path=":id" element={<FactureDetail />} />
                        <Route
                            path="/facture/FormFacture"
                            element={<FormFacture />}
                        />
                    </Route>
                    <Route path="transactions">
                        <Route
                            path="/transactions"
                            element={<Transactions />}
                        />
                        <Route path=":id" element={<TransactionDetail />} />
                    </Route>

                    <Route path="calander" element={<Calander />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
