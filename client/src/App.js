import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Login,
    Feed,
    Dashborad,
    Clients,
    Calander,
    Chat,
    FileManager,
    Inbox,
    PointSale,
    Post,
    Error,
} from "./pages";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed />}>
                    <Route index element={<Dashborad />} />
                    <Route path="dashboard" element={<Dashborad />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="inbox" element={<Inbox />} />
                    <Route path="file" element={<FileManager />} />
                    <Route path="point" element={<PointSale />} />
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
