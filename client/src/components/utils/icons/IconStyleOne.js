import { grey } from "@mui/material/colors";
import React from "react";

const IconStyleOne = ({ children }) => {
    return (
        <div className="bg-gray-200 w-fit p-2 md:p-3 text-gray-600 cursor-pointer rounded-lg shadow-sm hover:opacity-70 duration-150">
            {children}
        </div>
    );
};

export default IconStyleOne;
