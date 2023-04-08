import React from "react";
import SideBar from "./components/sideBar/SideBar";
import Wrapper from "./components/utils/Wrappers/Wrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Login,
    Feed,
    Dashborad,
    Menu,
    Calander,
    Chat,
    FileManager,
    Inbox,
    PointSale,
    Post,
} from "./pages";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Feed />}>
                    <Route index element={<Dashborad />} />
                    <Route path="dashboard" element={<Dashborad />} />
                    <Route path="menu" element={<Menu />} />
                    <Route path="inbox" element={<Inbox />} />
                    <Route path="file" element={<FileManager />} />
                    <Route path="point" element={<PointSale />} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="post" element={<Post />} />
                    <Route path="calander" element={<Calander />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
