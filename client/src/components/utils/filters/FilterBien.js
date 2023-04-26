import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";

import { motion } from "framer-motion";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideFilter } from "../../../store/overlaySlice";
import {
    setFilterPrice,
    setFilterStatus,
    setFilterOrder,
} from "../../../store/bienSlice";

const FilterBien = () => {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState("Asc");
    const [sortStatus, setSortStatus] = useState("");
    const bien = useSelector((state) => state.biens.bien);
    return (
        <motion.div
            animate={{
                y: "-100%",
                scale: 1,
            }}
            initial={{
                y: "-400%",
                x: "-50%",
                scale: 0.8,
            }}
            transition={{
                type: "spring",
                stiffness: 80,
            }}
            className="absolute z-40 w-full p-6 -translate-x-1/2 bg-white rounded-lg shadow-lg md:max-w-3xl top-1/2 left-1/2 -translate-y-2/3"
        >
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl text-blue-500">Filter</h1>
                <AiFillCloseCircle
                    onClick={() => {
                        dispatch(hideFilter());
                    }}
                    className="text-red-500 duration-150 cursor-pointer hover:opacity-75"
                    size={30}
                />
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(setFilterPrice());
                    dispatch(setFilterOrder({sortOrder}));
                    dispatch(setFilterStatus({sortStatus}));
                    dispatch(hideFilter());
                }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
                <h1 className="col-span-3">Prix :</h1>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Asc"
                        checked={sortOrder === "Asc"}
                        onChange={(e) => {
                            setSortOrder(e.target.value);
                        }}
                    />
                    Asc
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Desc"
                        checked={sortOrder === "Desc"}
                        onChange={(e) => {
                            setSortOrder(e.target.value);
                        }}
                    />
                    Desc
                </label>
                <hr className="col-span-3" />
                <h1 className="col-span-3">Status :</h1>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="disponible"
                        checked={sortStatus === "disponible"}
                        onChange={(e) => {
                            setSortStatus(e.target.value);
                        }}
                    />
                    Disponible
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="en location"
                        checked={sortStatus === "en location"}
                        onChange={(e) => {
                            setSortStatus(e.target.value);
                        }}
                    />
                    En location
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="vendu"
                        checked={sortStatus === "vendu"}
                        onChange={(e) => {
                            setSortStatus(e.target.value);
                        }}
                    />
                    Vendu
                </label>
                <button
                    type="submit"
                    class="btn btn-primary mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                    Chercher
                </button>
            </form>
        </motion.div>
    );
};

export default FilterBien;
