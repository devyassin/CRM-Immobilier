import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearDevisUpdate } from "../../../store/devisSlice";
import { clearFactureUpdate } from "../../../store/factureSlice";
import { clearClientUpdate } from "../../../store/clientSlice";
import { clearLeadUpdate } from "../../../store/leadSlice";
import { clearBonUpdate } from "../../../store/BonSlice";

const IconStyleTree = ({ children, route }) => {
    const dispatch = useDispatch();
    return (
        <Link
            onClick={() => {
                dispatch(clearDevisUpdate());
                dispatch(clearFactureUpdate());
                dispatch(clearClientUpdate());
                dispatch(clearLeadUpdate());
                dispatch(clearBonUpdate());
            }}
            to={route}
            className="  p-3 md:p-4 bg-blue-700 w-fit rounded-full cursor-pointer text-white hover:opacity-70 duration-150 shadow-sm"
        >
            {children}
        </Link>
    );
};

export default IconStyleTree;
