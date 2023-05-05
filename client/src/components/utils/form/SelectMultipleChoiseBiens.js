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
import {
    addBienToFacture,
    setFacturePrice,
    clearBiensFac,
} from "../../../store/factureSlice";
const SelectMultipleChoiseBiens = ({ type }) => {
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
    const facture = useSelector((state) => state.factures.facture);

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
        dispatch(clearBiens());
        dispatch(clearBiensFac());
        selected.map((item) => {
            const { id } = item.bien;
            if (type === "devis") {
                dispatch(addBienToDevis({ id }));
            } else {
                dispatch(addBienToFacture({ id }));
            }
        });
    };
    if (status === "succeeded") {
        const biensObj = biens.biens.map((bien) => {
            return { bien: bien, value: bien.NomBien, label: bien.NomBien };
        });

        const selectedBiens = biensObj.filter((item) => {
            if (type === "devis") {
                if (devi.biens.includes(item.bien.id)) {
                    return item;
                }
            } else {
                if (facture.biens.includes(item.bien.id)) {
                    return item;
                }
            }
        });
        const price = selectedBiens
            .reduce((acc, cur) => {
                return acc + Number(cur.bien.price);
            }, 0)
            .toFixed(2);

        if (type === "devis") {
            dispatch(setDevisEstimation({ price }));
        } else {
            dispatch(setFacturePrice({ price }));
        }
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
