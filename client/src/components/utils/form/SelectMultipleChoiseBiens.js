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
    const status = useSelector((state) => state.biens.status);
    const biens = useSelector((state) => state.biens.data);
    const devi = useSelector((state) => state.devis.devis);

    const facture = useSelector((state) => state.factures.facture);

    const handleSelectedOptions = (selected) => {
        dispatch(clearBiens({ biens }));
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
        const bienLocal = biens.biens.filter(
            (bien) => bien.exict === "local" && bien.status !== "vendu"
        );
        const bienNonLocal = biens.biens.filter(
            (bien) => bien.exict === "nonlocal"
        );
        const biensObj = bienLocal.map((bien) => {
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
        let price = selectedBiens
            .reduce((acc, cur) => {
                return acc + Number(cur.bien.price);
            }, 0)
            .toFixed(2);

        // get the biens with nonlocal exict :
        if (bienNonLocal.length != 0) {
            bienNonLocal.map((bien) => {
                if (devi.biens.includes(bien.id)) {
                    price = Number(price) + Number(bien.price);
                }
            });
        }

        if (type === "devis") {
            price = price.toString();
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
