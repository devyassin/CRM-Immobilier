import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleClientForm } from "../../../store/clientSlice";
const colourOptions = [
    { value: "Locataire", label: "Locataire" },
    { value: "Vendeur", label: "Vendeur" },
    { value: "Grande entreprise", label: "Grande entreprise" },
    { value: "Acheteur", label: "Acheteur" },
];
const SelectMultipleChoices = ({ client }) => {
    let name = "type";
    const dispatch = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [value, setSelectedString] = useState("");
    const handleSelectedOptions = (selected) => {
        setSelectedOptions(selected);
        const selectedValues = selected.map((option) => option.value);
        const selectedString = selectedValues.join(",");
        setSelectedString(selectedString);
    };
    dispatch(handleClientForm({ name, value }));

    const arrayOfSelectedOptions = client.type.split(",").map((item, i) => {
        return { value: item, label: item };
    });

    console.log(arrayOfSelectedOptions + "----->");
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
                value={client.type === "" ? null : arrayOfSelectedOptions} // Pass the selected options as value
                onChange={handleSelectedOptions} // Handle the selected options
            />
        </div>
    );
};

export default SelectMultipleChoices;
