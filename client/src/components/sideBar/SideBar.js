import React from "react";
import { logo } from "../../assets/images";
import MobileSideBar from "./MobileSideBar";
import { categories } from "../../constants/constants";
import DashboardButton from "../utils/buttons/DashboardButton";

const SideBar = () => {
    return (
        <div className="pl-8 pt-6 ">
            <MobileSideBar />
            <div class="flex">
                <nav class="side-nav">
                    <a href="" class="intro-x flex items-center pl-5 pt-4">
                        <img alt="" class="w-6" src={logo} />
                        <span class="hidden xl:block text-white text-lg ml-3">
                            {" "}
                            Rubick{" "}
                        </span>
                    </a>
                    <div class="side-nav__devider my-6"></div>
                    <ul className="">
                        {categories.map((categorie) => {
                            return (
                                <DashboardButton
                                    name={categorie.name}
                                    icon={categorie.icon}
                                />
                            );
                        })}
                    </ul>
                </nav>

                <div class="content">
                    <div class="intro-y flex items-center mt-8"></div>
                    <div class="intro-y grid grid-cols-12 gap-6 mt-5"></div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
