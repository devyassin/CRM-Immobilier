import React from "react";
import { toDoList } from "../../../assets/images";

const IconTacheStyle = ({ number }) => {
    return (
        <div className="relative">
            <img className="w-16 drop-shadow-lg" src={toDoList} alt="icon tache" />
            <div className="absolute text-center top-10 right-8  h-8 w-8 text-sm flex items-center justify-center text-white bg-blue-500 border-black border-2 rounded-full  ">
                {number}
            </div>
        </div>
    );
};

export default IconTacheStyle;
