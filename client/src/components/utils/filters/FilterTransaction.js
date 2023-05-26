import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";

import { motion } from "framer-motion";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideFilter } from "../../../store/overlaySlice";
import {
    setFilterType,
    setFilterMinPrice,
    setFilterMaxPrice,
} from "../../../store/transactionSlice";

const FilterTransaction = () => {
    const dispatch = useDispatch();

    const [sortType, setSortType] = useState("Default");
    const [sortModePaiement, setSortModePaiement] = useState("Default");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    return (
        <motion.div
            animate={{
                y: "-55%",
                scale: 1,
            }}
            initial={{
                y: "-400%",
                x: "-50%",
                scale: 0.8,
            }}
            transition={{
                type: "spring",
                stiffness: 50,
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

                    dispatch(setFilterType({ sortType, sortModePaiement }));
                    dispatch(setFilterMinPrice({ min }));
                    dispatch(setFilterMaxPrice({ max }));
                    dispatch(hideFilter());
                }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
                <h1 className="col-span-3">Type :</h1>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Gain"
                        checked={sortType === "Gain"}
                        onChange={(e) => {
                            setSortType(e.target.value);
                        }}
                    />
                    Gain
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Lost"
                        checked={sortType === "Lost"}
                        onChange={(e) => {
                            setSortType(e.target.value);
                        }}
                    />
                    Lost
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Default"
                        checked={sortType === "Default"}
                        onChange={(e) => {
                            setSortType(e.target.value);
                        }}
                    />
                    Default
                </label>
                <hr className="col-span-3" />
                <h1 className="col-span-3">Mode paiement :</h1>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Espèces"
                        checked={sortModePaiement === "Espèces"}
                        onChange={(e) => {
                            setSortModePaiement(e.target.value);
                        }}
                    />
                    Espèces
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Carte de crédit"
                        checked={sortModePaiement === "Carte de crédit"}
                        onChange={(e) => {
                            setSortModePaiement(e.target.value);
                        }}
                    />
                    Carte de crédit
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Virement bancaire"
                        checked={sortModePaiement === "Virement bancaire"}
                        onChange={(e) => {
                            setSortModePaiement(e.target.value);
                        }}
                    />
                    Virement bancaire
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Chèque"
                        checked={sortModePaiement === "Chèque"}
                        onChange={(e) => {
                            setSortModePaiement(e.target.value);
                        }}
                    />
                    Chèque
                </label>
                <label>
                    <input
                        className="mr-4"
                        type="radio"
                        value="Default"
                        checked={sortModePaiement === "Default"}
                        onChange={(e) => {
                            setSortModePaiement(e.target.value);
                        }}
                    />
                    Default
                </label>
                <div></div>
                <div></div>
                <hr className="col-span-3" />
                <h1 className="col-span-3">Prix :</h1>

                <input
                    className="mr-4"
                    type="number"
                    placeholder="min"
                    class="login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    value={min}
                    max={max}
                    onChange={(e) => {
                        setMin(e.target.value);
                    }}
                />

                <input
                    className="mr-4"
                    type="number"
                    value={max}
                    min={min}
                    class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="max"
                    onChange={(e) => {
                        setMax(e.target.value);
                    }}
                />
                <div></div>
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

export default FilterTransaction;
