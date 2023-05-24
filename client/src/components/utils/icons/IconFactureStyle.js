import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
const IconFactureStyle = ({ number }) => {
    return (
        <div className="relative">
            <FaFileInvoiceDollar className="text-red-500" size={55} />
            <div className="absolute text-center top-10 right-8  h-8 w-8 text-sm flex items-center justify-center text-white bg-blue-500 border-black border-2 rounded-full  ">
                {number}
            </div>
        </div>
    );
};

export default IconFactureStyle;
