import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleLeadForm } from "../../../store/leadSlice";

import { useEffect } from "react";
const colourOptions = [
    { value: "référence", label: "référence" },
    { value: "en ligne", label: "en ligne" },
    { value: "médias sociaux", label: "médias sociaux" },
    { value: "Portes ouvertes", label: "Portes ouvertes" },
];
const SelectOneChoiceSource = ({ lead }) => {
    let name = "lead_source";
    const dispatch = useDispatch();

    const [value, setSelectedString] = useState("");
    const handleSelectedOptions = (selected) => {   
        setSelectedString(selected);

        dispatch(
            handleLeadForm({
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
                    value === null ? "" : value
                    // lead.lead_source === "" ? null : arrayOfSelectedOptions[0]
                } // Pass the selected options as value
                onChange={handleSelectedOptions} // Handle the selected options
            />
        </div>
    );
};

export default SelectOneChoiceSource;
