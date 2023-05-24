import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import SelectOneChoiceTache from "./SelectOneChoiceTache";
import { motion } from "framer-motion";
import { Toastsuccess, Toastfailed, ToastLoading } from "../toast/Toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../../store/overlaySlice";
import {
    clearTacheUpdate,
    addTache,
    handleTacheForm,
    UpdateOneTache,
    showAlert,
    closeAlert,
    showAlertUpdate,
    closeAlertUpdate,
    initialStatus,
} from "../../../store/tacheSlice";

const FormTache = ({ tache }) => {
    const dispatch = useDispatch();
    const statusAddTache = useSelector((state) => state.taches.statusAddTache);
    const statusUpdateTache = useSelector(
        (state) => state.taches.statusUpdateTache
    );

    const errorMessage = useSelector((state) => state.taches.error);
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleTacheForm({ name, value }));
    };

    useEffect(() => {
        if (statusAddTache === "succeeded") {
            Toastsuccess("Tache Ajouter !");
        }

        if (statusAddTache === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusAddTache === "loading") {
            ToastLoading("Tache en cours d'ajout .....");
        }

        if (statusUpdateTache === "succeeded") {
            Toastsuccess("Tache Modifier !");
        }

        if (statusUpdateTache === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusUpdateTache === "loading") {
            ToastLoading("Tache en cours de modification .....");
        }

        dispatch(initialStatus());
    }, [statusAddTache, statusUpdateTache]);
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
                    {tache.id ? "Modifier Tache" : "Ajouter une Tache"}
                </h1>
                <AiFillCloseCircle
                    onClick={() => {
                        dispatch(hide());
                        if (tache.id) {
                            dispatch(clearTacheUpdate());
                        }
                    }}
                    className="text-red-500 duration-150 cursor-pointer hover:opacity-75"
                    size={30}
                />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!tache.id) {
                        dispatch(addTache(tache));
                        dispatch(showAlert());
                    } else {
                        console.log(tache);
                        dispatch(UpdateOneTache([tache.id, tache]));
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
                    name="title"
                    value={tache.title}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Titre"
                />
                <input
                    required
                    onChange={handleChange}
                    name="description"
                    value={tache.description}
                    type="text"
                    class="intro-x login__input form-control  px-4 block mt-4 focus:outline-none"
                    placeholder="Description"
                    maxLength="255"
                />

                <input
                    required
                    onChange={handleChange}
                    type="date"
                    value={tache.deadline.substring(0, 10)}
                    name="deadline"
                />
                <SelectOneChoiceTache tache={tache} />
                <div></div>
                <div></div>

                <button
                    type="submit"
                    class="btn btn-primary mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                    {tache.id ? "Modifier" : "Ajouter"}
                </button>
            </form>
        </motion.div>
    );
};

export default FormTache;
