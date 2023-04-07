import React from "react";

const DashboardButtonMobile = ({name,icon}) => {
    return (
        <li>
            <a href="" class="menu">
                <div class="menu__icon"> {icon}</div>
                <div class="menu__title"> {name} </div>
            </a>
        </li>
    );
};

export default DashboardButtonMobile;
