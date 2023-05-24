import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleFactureForm } from "../../../store/factureSlice";

const colourOptions = [
    { value: "payé", label: "payé" },
    { value: "non réglé", label: "non réglé" },
];
const SelectOneChoiceStatFacture = ({ facture }) => {
    let name = "status";
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
                value={
                    value === null
                        ? ""
                        : value
                        ? value
                        : { value: facture.status, label: facture.status }
                }
                onChange={handleSelectedOptions}
            />
        </div>
    );
};

export default SelectOneChoiceStatFacture;
