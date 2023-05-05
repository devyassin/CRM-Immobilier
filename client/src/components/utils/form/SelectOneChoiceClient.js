import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllClients, fetchOneClient } from "../../../store/clientSlice";
import { setEmail } from "../../../store/devisSlice";
import { setEmailFac } from "../../../store/factureSlice";

const SelectOneChoiceClient = ({ type }) => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.data);
    const client = useSelector((state) => state.clients.client);
    const status = useSelector((state) => state.clients.status);
    useEffect(() => {
        dispatch(fetchAllClients(``));
    }, []);

    const handleSelectedOptions = (selected) => {
        const { id, email } = selected.client;
        if (type === "facture") {
            dispatch(setEmailFac({ email }));
        } else {
            dispatch(setEmail({ email }));
        }
        dispatch(fetchOneClient(id));
    };

    if (status === "succeeded") {
        const clientsObj = clients.clients.map((client) => {
            return {
                client: client,
                value: `${client.nom} ${client.prenom}`,
                label: `${client.nom} ${client.prenom}`,
            };
        });

        return (
            <div className=" mt-5 z-50 w-full ">
                <Select
                    required
                    name="type"
                    options={clientsObj}
                    className="z-50 "
                    classNamePrefix="select"
                    value={{
                        client: client,
                        value: `${client.nom} ${client.prenom}`,
                        label: `${client.nom} ${client.prenom}`,
                    }}
                    onChange={handleSelectedOptions}
                />
            </div>
        );
    } else {
        return (
            <div className=" mt-5 z-50 w-full">
                <Select
                    required
                    name="type"
                    className="z-50 "
                    classNamePrefix="select"
                    value={{
                        client: client,
                        value: `${client.nom} ${client.prenom}`,
                        label: `${client.nom} ${client.prenom}`,
                    }}
                />
            </div>
        );
    }
};

export default SelectOneChoiceClient;
