import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllBiens } from "../../../store/bienSlice";
import {
    addBienToDevis,
    setDevisEstimation,
    clearBiens,
} from "../../../store/devisSlice";
const SelectMultipleChoiseBiens = () => {
    const dispatch = useDispatch();
    const filterName = useSelector((state) => state.biens.filterName);
    const filterStatus = useSelector((state) => state.biens.filterStatus);
    const filterPrice = useSelector((state) => state.biens.filterPrice);
    const filterOrder = useSelector((state) => state.biens.filterOrder);
    const filterMinPrice = useSelector((state) => state.biens.filterMinPrice);
    const filterMaxPrice = useSelector((state) => state.biens.filterMaxPrice);
    const status = useSelector((state) => state.biens.status);
    const biens = useSelector((state) => state.biens.data);
    const devi = useSelector((state) => state.devis.devis);

    useEffect(() => {
        dispatch(
            fetchAllBiens([
                filterName,
                filterStatus,
                filterPrice,
                filterOrder,
                filterMinPrice,
                filterMaxPrice,
            ])
        );
    }, []);
    const handleSelectedOptions = (selected) => {
        // const id = selected[selected.length - 1].bien.id;
        console.log(selected);
        dispatch(clearBiens());
        selected.map((item) => {
            const { id } = item.bien;
            dispatch(addBienToDevis({ id }));
        });
    };
    if (status === "succeeded") {
        const biensObj = biens.biens.map((bien) => {
            return { bien: bien, value: bien.NomBien, label: bien.NomBien };
        });

        const selectedBiens = biensObj.filter((item) => {
            if (devi.biens.includes(item.bien.id)) {
                return item;
            }
        });
        const price = selectedBiens
            .reduce((acc, cur) => {
                return acc + Number(cur.bien.price);
            }, 0)
            .toFixed(2);

        dispatch(setDevisEstimation({ price }));
        return (
            <div className=" mt-5 z-40 w-full ">
                <Select
                    required
                    isMulti
                    name="type"
                    options={biensObj}
                    className="z-40 text-xl"
                    classNamePrefix="select"
                    value={selectedBiens} // Pass the selected options as value
                    onChange={handleSelectedOptions}
                />
            </div>
        );
    }
};

export default SelectMultipleChoiseBiens;
