import React from "react";
import { useDispatch } from "react-redux";
import { show } from "../../../store/overlaySlice";

const IconStyleTwo = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => {
                dispatch(show());
            }}
            className="  p-3 md:p-4 bg-blue-700 w-fit rounded-full cursor-pointer text-white hover:opacity-70 duration-150 shadow-sm"
        >
            {children}
        </div>
    );
};

export default IconStyleTwo;
