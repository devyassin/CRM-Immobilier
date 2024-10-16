import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import SelectMultipleChoicesStatus from "./SelectMultipleChoicesStatus";
import SelectOneChoiceSource from "./SelectOneChoiceSource";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Toastsuccess, Toastfailed, ToastLoading } from "../toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../../store/overlaySlice";
import {
    clearLeadUpdate,
    addLead,
    handleLeadForm,
    UpdateOneLead,
    showAlert,
    closeAlert,
    showAlertUpdate,
    closeAlertUpdate,
    initialStatus,
} from "../../../store/leadSlice";
const FormLead = ({ lead }) => {
    const dispatch = useDispatch();
    const statusAddLead = useSelector((state) => state.leads.statusAddLead);
    const statusUpdateLead = useSelector(
        (state) => state.leads.statusUpdateLead
    );

    const errorMessage = useSelector((state) => state.leads.error);
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleLeadForm({ name, value }));
    };

    useEffect(() => {
        if (statusAddLead === "succeeded") {
            Toastsuccess("Prospect Ajouter !");
        }

        if (statusAddLead === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusAddLead === "loading") {
            ToastLoading("Prospect en cours d'ajout .....");
        }

        if (statusUpdateLead === "succeeded") {
            Toastsuccess("Prospect Modifier !");
        }

        if (statusUpdateLead === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusUpdateLead === "loading") {
            ToastLoading("Prospect en cours de modification .....");
        }

        dispatch(initialStatus());
    }, [statusAddLead, statusUpdateLead]);
    return (
        <motion.div
            animate={{
                y: "-70%",
                scale: 1,
            }}
            initial={{
                y: 0,
                x: "-50%",
                scale: 0.8,
            }}
            transition={{
                type: "spring",
                stiffness: 120,
            }}
            className="absolute z-40 w-full p-6 -translate-x-1/2 bg-white rounded-lg shadow-lg md:max-w-3xl top-1/2 left-1/2 -translate-y-2/3"
        >
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl text-blue-500">
                    {lead.id ? "Modifier Prospect" : "Ajouter un Prospect"}
                </h1>
                <AiFillCloseCircle
                    onClick={() => {
                        dispatch(hide());
                        if (lead.id) {
                            dispatch(clearLeadUpdate());
                        }
                    }}
                    className="text-red-500 duration-150 cursor-pointer hover:opacity-75"
                    size={30}
                />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!lead.id) {
                        dispatch(addLead(lead));
                        dispatch(showAlert());
                    } else {
                        dispatch(UpdateOneLead([lead.id, lead]));
                        dispatch(showAlertUpdate());
                    }

                    setTimeout(() => {
                        dispatch(closeAlert());
                        dispatch(closeAlertUpdate());
                    }, 3000);
                }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
                <input
                    required
                    onChange={handleChange}
                    name="nom"
                    value={lead.nom}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="First Name"
                />
                <input
                    required
                    onChange={handleChange}
                    name="prenom"
                    value={lead.prenom}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Last Name"
                />

                <input
                    required
                    onChange={handleChange}
                    name="tel"
                    value={lead.tel}
                    type="tel"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Phone"
                />
                <input
                    required
                    onChange={handleChange}
                    name="address"
                    value={lead.address}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Address"
                />

                <input
                    required
                    onChange={handleChange}
                    name="email"
                    value={lead.email}
                    type="email"
                    class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Email"
                />

                <SelectMultipleChoicesStatus lead={lead} />
                <SelectOneChoiceSource lead={lead} />
                <div></div>
                <div></div>

                <button
                    type="submit"
                    class="btn btn-primary mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                    {lead.id ? "Modifier" : "Ajouter"}
                </button>
            </form>
        </motion.div>
    );
};

export default FormLead;
