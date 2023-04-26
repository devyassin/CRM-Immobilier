import React from "react";
import SideBar from "../../components/sideBar/SideBar";
import Wrapper from "../../components/utils/Wrappers/Wrapper";
import { Outlet } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

const Feed = () => {
    const visibility = useSelector((state) => state.overlay.show);
    const visibilityFilter = useSelector((state) => state.overlay.showFilter);
    return (
        <div className="flex relative flex-col md:flex-row  h-screen md:h-min overflow-x-auto overflow-scroll tableScroll ">
            {visibility && (
                <div className="absolute top-0 bottom-0 left-0 right-0  bg-black z-30 opacity-50"></div>
            )}
            {visibilityFilter && (
                <div className="absolute top-0 bottom-0 left-0 right-0  bg-black z-30 opacity-50"></div>
            )}
            <SideBar />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </div>
    );
};

export default Feed;
