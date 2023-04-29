import React from "react";
import { logo,icon } from "../../assets/images";
import MobileSideBar from "./MobileSideBar";
import { categories } from "../../constants/constants";
import DashboardButton from "../utils/buttons/DashboardButton";
// h-[500px]  overflow-x-hidden w-[400px] overflow-y-scroll
const SideBar = () => {
    return (
        <div className="pt-6 pl-8 ">
            <MobileSideBar />
            <div class="flex ">
                <nav class="side-nav scroolbar">
                    <a href="dashboard" class=" flex items-center pl-5 pt-4">
                        <img  class="w-10" src={icon} />
                        <span class="hidden xl:block text-white text-xl ml-3">
                            {" "}
                            Tiguemi{" "}
                        </span>
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
