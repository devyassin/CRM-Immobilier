import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPageName } from "../../../store/selectedPageSlice";

const DashboardButtonMobile = ({ name, icon, path }) => {
    const selectedPage = useSelector(
        (state) => state.selectedPage.selectedPage
    );

    const dispatch = useDispatch();
    return (
        <li>
            <Link
                onClick={() => dispatch(setPageName({ name }))}
                to={path}
                class="menu"
            >
                <div class="menu__icon"> {icon}</div>
                <div class="menu__title min-w-[fit-content]"> {name} </div>
            </Link>
        </li>
    );
};

export default DashboardButtonMobile;
