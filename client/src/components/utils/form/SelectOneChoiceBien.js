import React from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { handleBienForm } from "../../../store/bienSlice";

const colourOptions = [
    { value: "Appartement", label: "Appartement" },
    { value: "Maison individuelle", label: "Maison individuelle" },
    { value: "Maison mitoyenne", label: "Maison mitoyenne" },
    { value: "Maison de ville", label: "Maison de ville" },
    { value: "Maison de campagne", label: "Maison de campagne" },
    { value: "Ferme", label: "Ferme" },
    { value: "Studio", label: "Studio" },
    { value: "Duplex", label: "Duplex" },
    { value: "Triplex", label: "Triplex" },
    { value: "Loft", label: "Loft" },
    { value: "Penthouse", label: "Penthouse" },
    { value: "Château", label: "Château" },
    { value: "Manoir", label: "Manoir" },
    { value: "Villa", label: "Villa" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Terrain", label: "Terrain" },
    { value: "Garage", label: "Garage" },
    { value: "Parking", label: "Parking" },
    { value: "Autres", label: "Autres" },
];
const SelectOneChoiceBien = ({ bien }) => {
    let name = "type";
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
                        : { value: bien.type, label: bien.type }
                }
                onChange={handleSelectedOptions}
            />
        </div>
    );
};

export default SelectOneChoiceBien;
