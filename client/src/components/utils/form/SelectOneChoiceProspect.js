import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllLeads, fetchOneLead } from "../../../store/leadSlice";
import { setEmail } from "../../../store/BonSlice";

const SelectOneChoiceProspect = ({ type }) => {
    const dispatch = useDispatch();
    const leads = useSelector((state) => state.leads.data);
    const lead = useSelector((state) => state.leads.lead);
    const status = useSelector((state) => state.leads.status);
    useEffect(() => {
        dispatch(fetchAllLeads(``));
    }, []);

    const handleSelectedOptions = (selected) => {
        const { id, email } = selected.lead;

        dispatch(setEmail({ email }));

        dispatch(fetchOneLead(id));
    };

    if (status === "succeeded") {
        const leadsObj = leads.leads.map((lead) => {
            return {
                lead: lead,
                value: `${lead.nom} ${lead.prenom}`,
                label: `${lead.nom} ${lead.prenom}`,
            };
        });

        return (
            <div className=" mt-5 z-50 w-full ">
                <Select
                    required
                    name="type"
                    options={leadsObj}
                    className="z-50 "
                    classNamePrefix="select"
                    value={{
                        lead: lead,
                        value: `${lead.nom} ${lead.prenom}`,
                        label: `${lead.nom} ${lead.prenom}`,
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
                        lead: lead,
                        value: `${lead.nom} ${lead.prenom}`,
                        label: `${lead.nom} ${lead.prenom}`,
                    }}
                />
            </div>
        );
    }
};

export default SelectOneChoiceProspect;
