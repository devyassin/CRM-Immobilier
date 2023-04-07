import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import Wrapper from "../../components/utils/Wrappers/Wrapper";
import { Outlet } from "react-router-dom";

const Feed = () => {
    return (
        <div className="flex">
            <SideBar />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </div>
    );
};

export default Feed;
