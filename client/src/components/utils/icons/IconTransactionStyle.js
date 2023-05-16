import React from "react";
import { TfiStatsUp, TfiStatsDown } from "react-icons/tfi";
import { FaDollarSign } from "react-icons/fa";
const IconTransactionStyle = ({ number }) => {
    return (
        <div className="relative">
            <FaDollarSign className="text-red-500" size={50} />
            <div className="absolute text-center top-7 right-7  h-8 w-8 text-sm flex items-center justify-center text-white bg-blue-500 border-black border-2 rounded-full  ">
                {number}
            </div>
        </div>
    );
};

export default IconTransactionStyle;
