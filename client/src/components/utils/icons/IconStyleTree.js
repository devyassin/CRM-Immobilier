import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearDevisUpdate } from "../../../store/devisSlice";

const IconStyleTree = ({ children, route }) => {
    const dispatch = useDispatch();
    return (
        <Link
            onClick={() => {
                dispatch(clearDevisUpdate());
            }}
            to={route}
            className="  p-3 md:p-4 bg-blue-700 w-fit rounded-full cursor-pointer text-white hover:opacity-70 duration-150 shadow-sm"
        >
            {children}
        </Link>
    );
};

export default IconStyleTree;
