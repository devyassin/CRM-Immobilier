import React from "react";
import { HiDocumentText } from "react-icons/hi";
const IconDevisStyle = ({ number }) => {
    return (
        <div className="relative">
            <HiDocumentText className="text-red-500" size={70} />
            <div className="absolute text-center top-11 right-10  h-8 w-8 text-sm flex items-center justify-center text-white bg-blue-500 border-black border-2 rounded-full  ">
                {number}
            </div>
        </div>
    );
};

export default IconDevisStyle;
