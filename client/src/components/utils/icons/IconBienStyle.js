import React from "react";
import { BsBuildingFill } from "react-icons/bs";
const IconBienStyle = ({ number }) => {
    return (
        <div className="relative">
            <BsBuildingFill className="text-red-500" size={50} />
            <div className="absolute text-center top-8 right-7  h-8 w-8 text-sm flex items-center justify-center text-white bg-blue-500 border-black border-2 rounded-full  ">
                {number}
            </div>
        </div>
    );
};

export default IconBienStyle;