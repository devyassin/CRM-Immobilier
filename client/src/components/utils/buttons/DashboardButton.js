import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPageName } from "../../../store/selectedPageSlice";

const DashboardButton = ({ name, icon, path }) => {
    const selectedPage = useSelector(
        (state) => state.selectedPage.selectedPage
    );

    const dispatch = useDispatch();
    return (
        <li>
            <Link
                onClick={() => {
                    localStorage.setItem("route", name);
                    localStorage.setItem("routed", path);
                    dispatch(setPageName({ name }));
                }}
                to={path}
                class={`side-menu ${
                    selectedPage === name ? " side-menu--active" : ""
                }`}
            >
                <div
                    class={`side-menu__icon text ${
                        selectedPage === name ? "text-blue-500" : ""
                    }`}
                >
                    {" "}
                    {/* <i data-feather="home"></i>{" "} */}
                    {icon}
                </div>
                <div
                    class={`side-menu__title text-md ${
                        selectedPage === name ? "text-black font-bold" : ""
                    }`}
                >
                    {name}
                </div>
            </Link>
        </li>
    );
};

export default DashboardButton;
