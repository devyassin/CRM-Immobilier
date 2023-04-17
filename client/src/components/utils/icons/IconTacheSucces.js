import React from "react";
import { BiTask } from "react-icons/bi";

const IconTacheSucces = ({ number }) => {
    return (
        <div className="relative">
            <BiTask className="text-green-500 opacity-80 " size={72} />
            <div className="absolute text-center top-11 right-11  h-8 w-8 text-sm flex items-center justify-center text-white bg-blue-500 border-black border-2 rounded-full  ">
                {number}
            </div>
        </div>
    );
};

export default IconTacheSucces;
