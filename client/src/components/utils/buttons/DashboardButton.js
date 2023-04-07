import React from "react";
import { Link } from "react-router-dom";

const DashboardButton = ({ name, icon,path }) => {
    return (
        <li>
            <Link to={path} class="side-menu ">
                <div class="side-menu__icon">
                    {" "}
                    {/* <i data-feather="home"></i>{" "} */}
                    {icon}
                </div>
                <div class="side-menu__title text-md">{name}</div>
            </Link>
        </li>
    );
};

export default DashboardButton;
