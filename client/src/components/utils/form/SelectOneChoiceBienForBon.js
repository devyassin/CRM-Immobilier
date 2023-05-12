import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllBiens } from "../../../store/bienSlice";
import { setBienName, setBienId } from "../../../store/BonSlice";

const SelectMultipleChoiseBienForBon = ({ type }) => {
    const [selectedBien, setSelectedBien] = useState("");
    const dispatch = useDispatch();
    const status = useSelector((state) => state.biens.status);
    const biens = useSelector((state) => state.biens.data);
    const bon = useSelector((state) => state.bons.bon);

    const handleSelectedOptions = (selected) => {
        const NomBien = selected.bien.NomBien;
        dispatch(setBienName({ NomBien }));
        if (bon?.id) {
            const id = selected.bien.id;
            dispatch(setBienId({ id }));
        }
        setSelectedBien(selected);
    };
    if (status === "succeeded") {
        const bienLocal = biens.biens.filter((bien) => bien.exict === "local");

        const biensObj = bienLocal.map((bien) => {
            return { bien: bien, value: bien.NomBien, label: bien.NomBien };
        });

        return (
            <div className=" mt-5 z-40 w-full ">
                <Select
                    required
                    name="type"
                    options={biensObj}
                    className="z-40 text-xl"
                    classNamePrefix="select"
                    value={
                        bon?.NomBien === ""
                            ? ""
                            : bon.NomBien
                            ? selectedBien
                            : {
                                  bien: bon.bien,
                                  value: bon.bien.NomBien,
                                  label: bon.bien.NomBien,
                              }
                    }
                    onChange={handleSelectedOptions}
                />
            </div>
        );
    }
};

export default SelectMultipleChoiseBienForBon;
