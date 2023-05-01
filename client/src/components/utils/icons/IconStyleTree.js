import React from "react";
import { Link } from "react-router-dom";

const IconStyleTree = ({ children, route }) => {
    return (
        <Link
            to={route}
            className="  p-3 md:p-4 bg-blue-700 w-fit rounded-full cursor-pointer text-white hover:opacity-70 duration-150 shadow-sm"
        >
            {children}
        </Link>
    );
};

export default IconStyleTree;
