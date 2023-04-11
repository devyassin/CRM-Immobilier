import React from "react";
import { logo } from "../../assets/images";
import MobileSideBar from "./MobileSideBar";
import { categories } from "../../constants/constants";
import DashboardButton from "../utils/buttons/DashboardButton";
// h-[500px]  overflow-x-hidden w-[400px] overflow-y-scroll
const SideBar = () => {
    return (
        <div className="pl-8 pt-6 ">
            <MobileSideBar />
            <div class="flex ">
                <nav class="side-nav scroolbar">
                    <a href="" class=" flex items-center pl-5 pt-4">
                        <img alt="" class="w-6" src={logo} />
                        <span class="hidden xl:block text-white text-lg ml-3">
                            {" "}
                            Rubick{" "}
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
