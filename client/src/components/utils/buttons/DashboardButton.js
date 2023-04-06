import React from "react";

const DashboardButton = ({ name, icon }) => {
    return (
        <li>
            <a href="" class="side-menu ">
                <div class="side-menu__icon">
                    {" "}
                    {/* <i data-feather="home"></i>{" "} */}
                    {icon}
                </div>
                <div class="side-menu__title text-md">{name}</div>
            </a>
        </li>
    );
};

export default DashboardButton;
