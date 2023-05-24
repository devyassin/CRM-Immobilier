import React from "react";

const AlertForm = ({ message, type }) => {
    return (
        <div
            className={`${
                type === "failed" ? "bg-red-300  rounded-lg py-4" : "bg-green-400 rounded-lg py-4"
            } `}
        >
            <h1 className="text-center text-2xl text-gray-700 opacity-70">
                {message}
            </h1>
        </div>
    );
};

export default AlertForm;
