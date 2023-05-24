import React from "react";
import Tache from "./Tache";

const Column = ({ title, number, type, list }) => {
 
    return (
        <div className="flex flex-col drop-shadow-xl  ">
            {/* titre */}
            <div
                className={`text-2xl ${
                    type === "todo"
                        ? "bg-red-400"
                        : type === "progress"
                        ? "bg-blue-400"
                        : type === "done"
                        ? "bg-green-400"
                        : ""
                } rounded-t-lg p-4`}
            >
                {title} |
                <span
                    className={`${
                        type === "todo"
                            ? "text-red-700"
                            : type === "progress"
                            ? "text-blue-700"
                            : type === "done"
                            ? "text-green-700"
                            : ""
                    }`}
                >
                    {" "}
                    {number}
                </span>
            </div>
            {/* taches */}
            <div className="flex flex-col p-2 space-y-2 overflow-x-auto overflow-scroll tableScroll  bg-blue-100 h-[400px]">
                {list.map((tache) => {
                    return <Tache key={tache.id} tache={tache} type={type} />;
                })}
            </div>
        </div>
    );
};

export default Column;
