import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleBienForm } from "../../../store/bienSlice";

const colourOptions = [
    { value: "disponible", label: "disponible" },
    { value: "en location", label: "en location" },
    { value: "vendu", label: "vendu" },
];
const SelectOneChoiceBienStatus = ({ bien }) => {
    let name = "status";
    const dispatch = useDispatch();

    const [value, setSelectedString] = useState("");
    const handleSelectedOptions = (selected) => {
        setSelectedString(selected);

        dispatch(
            handleBienForm({
                name,
                value: selected === null ? "" : selected.value,
            })
        );
    };

    return (
        <div className=" mt-5 z-40">
            <Select
                required
                name="status"
                options={colourOptions}
                className="z-40"
                classNamePrefix="select"
                placeholder="Select a status"
                max={4}
                value={
                    value === null
                        ? ""
                        : value
                        ? value
                        : { value: bien.status, label: bien.status }
                }
                onChange={handleSelectedOptions}
            />
        </div>
    );
};

export default SelectOneChoiceBienStatus;
