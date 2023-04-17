import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
const Tache = ({ type }) => {
    return (
        <div
            className={`flex flex-col ${
                type === "todo"
                    ? "bg-red-200"
                    : type === "progress"
                    ? "bg-blue-200"
                    : type === "done"
                    ? "bg-green-200"
                    : ""
            } p-1 pl-3 pb-4 rounded-lg`}
        >
            <div className="flex justify-between">
                <div></div>
                <AiFillCloseCircle
                    className="cursor-pointer text-red-500 hover:text-red-400 duration-150 "
                    size={25}
                />
            </div>

            <h1 className="text-lg font-bold ">Prendre un Rendez-vous</h1>
            <div className="flex items-center space-x-2 mb-3">
                <h1 className="text-lg">Date :</h1>
                <p className="opacity-60 mt-[2px]">2023-03-08</p>
            </div>

            <p className="text-[12px] opacity-70 leading-4">
                Le processus implique la prise de contact avec le client, la
                compréhension de ses besoins et de ses préférences en matière
                d'immobilier, la recherche d'un agent immobilier approprié pour
                répondre à ces besoins, et la fixation d'un rendez-vous pour le
                client avec l'agent immobilier.
            </p>
        </div>
    );
};

export default Tache;
