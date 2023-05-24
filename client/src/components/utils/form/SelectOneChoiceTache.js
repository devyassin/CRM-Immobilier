import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleTacheForm } from "../../../store/tacheSlice";

import { useEffect } from "react";
const colourOptions = [
    { value: "À faire", label: "À faire" },
    { value: "En cours", label: "En cours" },
    { value: "Terminé", label: "Terminé" },
];
const SelectOneChoiceTache = ({ tache }) => {
    let name = "status";
    const dispatch = useDispatch();

    const [value, setSelectedString] = useState("");
    const handleSelectedOptions = (selected) => {
        setSelectedString(selected);

        dispatch(
            handleTacheForm({
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
                        : { value: tache.status, label: tache.status }
                }
                onChange={handleSelectedOptions}
            />
        </div>
    );
};

export default SelectOneChoiceTache;
