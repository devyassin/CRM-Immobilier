import React from "react";
import { FaUserCircle } from "react-icons/fa";
const IconUserStyle = ({ number }) => {
    return (
        <div className="relative">
            <FaUserCircle className="text-red-500" size={50} />
            <div className="absolute text-center top-6 right-8  h-8 w-8 text-sm flex items-center justify-center text-white bg-blue-500 border-black border-2 rounded-full  ">
                {number}
            </div>
        </div>
    );
};

export default IconUserStyle;
