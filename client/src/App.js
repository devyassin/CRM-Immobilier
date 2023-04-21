import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Login,
    ProtectedRoute,
    Feed,
    Dashborad,
    Clients,
    Calander,
    Chat,
    Biens,
    Taches,
    Post,
    Error,
    Leads,
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
                    <Route path="chat" element={<Chat />} />
                    <Route path="post" element={<Post />} />
                    <Route path="calander" element={<Calander />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
