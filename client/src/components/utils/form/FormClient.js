import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import SelectMultipleChoices from "./SelectMultipleChoices";
import { useEffect } from "react";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../../store/overlaySlice";
import { Toastsuccess, Toastfailed, ToastLoading } from "../toast/Toast";
import {
    clearClientUpdate,
    addClient,
    handleClientForm,
    UpdateOneClient,
    showAlert,
    closeAlert,
    showAlertUpdate,
    closeAlertUpdate,
    initialStatus,
} from "../../../store/clientSlice";

const FormClient = ({ client }) => {
    const dispatch = useDispatch();

    const statusAddClient = useSelector(
        (state) => state.clients.statusAddClient
    );
    const statusUpdateClient = useSelector(
        (state) => state.clients.statusUpdateClient
    );

    const errorMessage = useSelector((state) => state.clients.error);
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleClientForm({ name, value }));
    };
    useEffect(() => {
        if (statusAddClient === "succeeded") {
            Toastsuccess("Client Ajouter !");
        }

        if (statusAddClient === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusAddClient === "loading") {
            ToastLoading("Client en cours d'ajout .....");
        }

        if (statusUpdateClient === "succeeded") {
            Toastsuccess("Client Modifier !");
        }

        if (statusUpdateClient === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusUpdateClient === "loading") {
            ToastLoading("Client en cours de modification .....");
        }
        dispatch(initialStatus());
    }, [statusAddClient, statusUpdateClient]);
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
                    {client.id ? "Modifier Client" : "Ajouter un client"}
                </h1>
                <AiFillCloseCircle
                    onClick={() => {
                        dispatch(hide());
                        if (client.id) {
                            dispatch(clearClientUpdate());
                        }
                    }}
                    className="text-red-500 duration-150 cursor-pointer hover:opacity-75"
                    size={30}
                />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!client.id) {
                        dispatch(addClient(client));

                        dispatch(showAlert());
                    } else {
                        dispatch(UpdateOneClient([client.id, client]));
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
                    value={client.nom}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Nom"
                />
                <input
                    required
                    onChange={handleChange}
                    name="prenom"
                    value={client.prenom}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Prenom"
                />

                <SelectMultipleChoices client={client} />
                <input
                    required
                    onChange={handleChange}
                    name="tel"
                    value={client.tel}
                    type="tel"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Phone"
                />
                <input
                    required
                    onChange={handleChange}
                    name="address"
                    value={client.address}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Address"
                />

                <input
                    required
                    onChange={handleChange}
                    name="email"
                    value={client.email}
                    type="email"
                    class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Email"
                />

                <input
                    required
                    onChange={handleChange}
                    type="date"
                    value={client.last_contacted.substring(0, 10)}
                    name="last_contacted"
                />
                <div></div>
                <div></div>

                <button
                    type="submit"
                    class="btn btn-primary mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                    {client.id ? "Modifier" : "Ajouter"}
                </button>
            </form>
        </motion.div>
    );
};

export default FormClient;
