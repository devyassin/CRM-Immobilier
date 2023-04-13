import React from "react";
import { logo } from "../../assets/images";
import { categories } from "../../constants/constants";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import DashboardButtonMobile from "../utils/buttons/DashboardButtonMobile";

import { useState } from "react";
import { icon } from "../../assets/images";
const MobileSideBar = () => {
    const [active, setActive] = useState(false);
    return (
        <div class="mobile-menu md:hidden">
            <div class="mobile-menu-bar ">
                <a href="" class="flex mr-auto">
                    <img alt="icon" className="w-12" src={icon} />
                </a>{" "}
                <RiBarChartHorizontalLine
                    onClick={() => setActive(!active)}
                    class={`w-8 h-8 hover:cursor-pointer opacity-80 duration-300 text-white  transform ${
                        active ? "-rotate-90" : ""
                    }`}
                />
            </div>
            <ul
                class={`border-t border-white/[0.08]  ${
                    active === false ? "hidden" : ""
                } flex space-x-6 overflow-scroll mobileScroll overflow-y-hidden`}
            >
                {categories.map((categorie, i) => {
                    return (
                        <DashboardButtonMobile
                            key={i}
                            path={categorie.path}
                            name={categorie.name}
                            icon={categorie.icon}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default MobileSideBar;
