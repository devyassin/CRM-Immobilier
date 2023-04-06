import React from "react";
import { logo } from "../../assets/images";
import { categories } from "../../constants/constants";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { useState } from "react";
const MobileSideBar = () => {
    const [active, setActive] = useState(false);
    return (
        <div class="mobile-menu md:hidden">
            <div class="mobile-menu-bar">
                <a href="" class="flex mr-auto">
                    <img alt="dddd" className="w-6" src={logo} />
                </a>{" "}
                <RiBarChartHorizontalLine
                    onClick={() => setActive(!active)}
                    class={`w-8 h-8 hover:cursor-pointer opacity-80 duration-150 text-white transform `}
                />
            </div>
            <ul
                class={`border-t border-white/[0.08] py-5 ${
                    active === false ? "hidden" : ""
                }`}
            >
                <li>
                    <a href="" class="menu">
                        <div class="menu__icon">
                            {" "}
                            <i data-feather="home"></i>{" "}
                        </div>
                        <div class="menu__title"> Dashboard </div>
                    </a>
                </li>
                <li>
                    <a href="" class="menu">
                        <div class="menu__icon">
                            {" "}
                            <i data-feather="box"></i>{" "}
                        </div>
                        <div class="menu__title"> Menu Layout </div>
                    </a>
                </li>
                <li>
                    <a href="" class="menu">
                        <div class="menu__icon">
                            {" "}
                            <i data-feather="inbox"></i>{" "}
                        </div>
                        <div class="menu__title"> Inbox </div>
                    </a>
                </li>
                <li>
                    <a href="" class="menu">
                        <div class="menu__icon">
                            {" "}
                            <i data-feather="hard-drive"></i>{" "}
                        </div>
                        <div class="menu__title"> File Manager </div>
                    </a>
                </li>
                <li>
                    <a href="" class="menu">
                        <div class="menu__icon">
                            {" "}
                            <i data-feather="credit-card"></i>{" "}
                        </div>
                        <div class="menu__title"> Point of Sale </div>
                    </a>
                </li>
                <li>
                    <a href="" class="menu">
                        <div class="menu__icon">
                            {" "}
                            <i data-feather="message-square"></i>{" "}
                        </div>
                        <div class="menu__title"> Chat </div>
                    </a>
                </li>
                <li>
                    <a href="" class="menu">
                        <div class="menu__icon">
                            {" "}
                            <i data-feather="file-text"></i>{" "}
                        </div>
                        <div class="menu__title"> Post </div>
                    </a>
                </li>
                <li>
                    <a href="" class="menu">
                        <div class="menu__icon">
                            {" "}
                            <i data-feather="calendar"></i>{" "}
                        </div>
                        <div class="menu__title"> Calendar </div>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default MobileSideBar;
