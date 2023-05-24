import React from "react";
import { icon } from "../../assets/images";
import Logout from "../../pages/Dashboard/Logout";
import MobileSideBar from "./MobileSideBar";
import { categories } from "../../constants/constants";
import DashboardButton from "../utils/buttons/DashboardButton";

const SideBar = () => {
    return (
        <div className="pt-6 pl-8 ">
            <Logout />
            <MobileSideBar />
            <div class="flex ">
                <nav class="side-nav scroolbar">
                    <a href="" class=" flex items-center pl-5 pt-4">
                        <img class="w-10" src={icon} />
                        <span class="hidden xl:block text-white text-xl ml-3">
                            {" "}
                            Tiguemi
                        </span>
                        <p className="text-white text-[10px] opacity-80 ml-1 ">version 1</p>
                    </a>
                    <div class="side-nav__devider my-6"></div>
                    <ul class="h-full ">
                        {categories.map((categorie, i) => {
                            return (
                                <DashboardButton
                                    key={i}
                                    path={categorie.path}
                                    name={categorie.name}
                                    icon={categorie.icon}
                                />
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
