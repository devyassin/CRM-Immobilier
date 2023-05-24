import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleFactureForm } from "../../../store/factureSlice";

const colourOptions = [
    { value: "espèces", label: "espèces" },
    { value: "carte de crédit", label: "carte de crédit" },
    { value: "virement bancaire", label: "virement bancaire" },
    { value: "chèque", label: "chèque" },
];
const SelectOneChoicePaiFacture = ({ facture }) => {
    let name = "mode_payment";
    const dispatch = useDispatch();

    const [value, setSelectedString] = useState("");
    const handleSelectedOptions = (selected) => {
        setSelectedString(selected);

        dispatch(
            handleFactureForm({
                name,
                value: selected === null ? "" : selected.value,
            })
        );
    };

    return (
        <div className=" mt-5 z-40">
            <Select
                required
                name="type"
                options={colourOptions}
                className="z-40"
                classNamePrefix="select"
                max={4}
                value={{
                    value: facture.mode_payment,
                    label: facture.mode_payment,
                }}
                onChange={handleSelectedOptions}
            />
        </div>
    );
};

export default SelectOneChoicePaiFacture;
