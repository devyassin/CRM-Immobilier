import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const HeaderFile = ({ name }) => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <HeaderTitle title={`Imprimer ${name}`} />
                <Link to={`/${name}`}>
                    <IoArrowBackCircleSharp
                        size={50}
                        className="cursor-pointer text-blue-400 hover:opacity-80 duration-150"
                    />
                </Link>
            </div>
            <div className="flex items-center justify-center mt-40 ">
                <div class="loading-spinner"></div>
            </div>
        </div>
    );
};

export default HeaderFile;
