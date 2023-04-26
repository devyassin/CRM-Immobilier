import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";

import AlertForm from "../alerts/AlertForm";
import SelectOneChoiceTache from "./SelectOneChoiceTache";
import { motion } from "framer-motion";

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
} from "../../../store/tacheSlice";

const FormTache = ({ tache }) => {
    const dispatch = useDispatch();
    const statusAddTache = useSelector((state) => state.taches.statusAddTache);
    const statusUpdateTache = useSelector(
        (state) => state.taches.statusUpdateTache
    );
    const alertVisibility = useSelector((state) => state.taches.showAlert);
    const alertUpdateVisibility = useSelector(
        (state) => state.taches.showAlertUpdate
    );
    const errorMessage = useSelector((state) => state.taches.error);
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleTacheForm({ name, value }));
    };
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

            {statusAddTache === "loading" && alertVisibility && (
                <AlertForm
                    message="Tache en cours d'ajout ....."
                    type="success"
                />
            )}

            {statusAddTache === "succeeded" && alertVisibility && (
                <AlertForm message="Tache Ajouter !" type="success" />
            )}
            {statusAddTache === "failed" && alertVisibility && (
                <AlertForm message={errorMessage} type="failed" />
            )}

            {statusUpdateTache === "loading" && alertUpdateVisibility && (
                <AlertForm
                    message="Tache en cours de modification ....."
                    type="success"
                />
            )}

            {statusUpdateTache === "succeeded" && alertUpdateVisibility && (
                <AlertForm message="Tache Modifier !" type="success" />
            )}

            {statusUpdateTache === "failed" && alertUpdateVisibility && (
                <AlertForm message={errorMessage} type="failed" />
            )}
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
