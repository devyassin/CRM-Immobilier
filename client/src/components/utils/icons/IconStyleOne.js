import React from "react";
import { showFilter } from "../../../store/overlaySlice";
import { useDispatch } from "react-redux";

const IconStyleOne = ({ children, type }) => {
    const dispatch = useDispatch();
    if (type === "filter") {
        return (
            <div
                onClick={() => {
                    dispatch(showFilter());
                }}
                className="bg-gray-200 w-fit p-2 md:p-3 text-gray-600 cursor-pointer rounded-lg shadow-sm hover:opacity-70 duration-150"
            >
                {children}
            </div>
        );
    } else {
        return (
            <div className="bg-gray-200 w-fit p-2 md:p-3 text-gray-600 cursor-pointer rounded-lg shadow-sm hover:opacity-70 duration-150">
                {children}
            </div>
        );
    }
};

export default IconStyleOne;
