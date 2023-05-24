import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleLeadForm } from "../../../store/leadSlice";
const colourOptions = [
    { value: "Nouveau", label: "Nouveau" },
    { value: "Contacté", label: "Contacté" },
    { value: "Intéressé", label: "Intéressé" },
    { value: "Programmé une visite", label: "Programmé une visite" },
];
const SelectMultipleChoicesStatus = ({ lead }) => {
    let name = "status";
    const dispatch = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [value, setSelectedString] = useState("");
    const handleSelectedOptions = (selected) => {
        setSelectedOptions(selected);
        console.log(selected);
        const selectedValues = selected.map((option) => option.value);
        const selectedString = selectedValues.join(",");
        setSelectedString(selectedString);
    };
    dispatch(handleLeadForm({ name, value }));

    const arrayOfSelectedOptions = lead.status.split(",").map((item, i) => {
        return { value: item, label: item };
    });

 
    return (
        <div className=" mt-5 z-40">
            <Select
                required
                isMulti
                name="type"
                options={colourOptions}
                className="z-40"
                classNamePrefix="select"
                max={4}
                value={lead.status === "" ? null : arrayOfSelectedOptions} // Pass the selected options as value
                onChange={handleSelectedOptions} // Handle the selected options
            />
        </div>
    );
};

export default SelectMultipleChoicesStatus;
