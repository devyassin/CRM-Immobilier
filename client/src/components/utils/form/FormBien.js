import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";
import { useEffect } from "react";
import { Toastsuccess, Toastfailed, ToastLoading } from "../toast/Toast";
import { motion } from "framer-motion";
import SelectOneChoiceBien from "./SelectOneChoiceBien";
import SelectOneChoiceBienStatus from "./SelectOneChoiceBienStatus";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../../store/overlaySlice";
import {
    clearBienUpdate,
    addBien,
    handleBienForm,
    UpdateOneBien,
    showAlert,
    closeAlert,
    showAlertUpdate,
    closeAlertUpdate,
    initialStatus,
} from "../../../store/bienSlice";
const FormBien = ({ bien }) => {
    const dispatch = useDispatch();
    const statusAddBien = useSelector((state) => state.biens.statusAddBien);
    const statusUpdateBien = useSelector(
        (state) => state.biens.statusUpdateBien
    );

    const errorMessage = useSelector((state) => state.biens.error);
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleBienForm({ name, value }));
    };

    useEffect(() => {
        if (statusAddBien === "succeeded") {
            Toastsuccess("Bien Ajouter !");
        }

        if (statusAddBien === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusAddBien === "loading") {
            ToastLoading("Bien en cours d'ajout .....");
        }

        if (statusUpdateBien === "succeeded") {
            Toastsuccess("Bien Modifier !");
        }

        if (statusUpdateBien === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusUpdateBien === "loading") {
            ToastLoading("Bien en cours de modification .....");
        }

        dispatch(initialStatus());
    }, [statusAddBien, statusUpdateBien]);
    return (
        <motion.div
            animate={{
                y: "-60%",
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
                    {bien?.id ? "Modifier Bien" : "Ajouter un bien"}
                </h1>
                <AiFillCloseCircle
                    onClick={() => {
                        dispatch(hide());
                        if (bien?.id) {
                            dispatch(clearBienUpdate());
                        }
                    }}
                    className="text-red-500 duration-150 cursor-pointer hover:opacity-75"
                    size={30}
                />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!bien?.id) {
                        dispatch(addBien(bien));
                        dispatch(showAlert());
                    } else {
                        dispatch(UpdateOneBien([bien.id, bien]));
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
                    name="NomBien"
                    value={bien.NomBien}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Nom Bien"
                />
                <input
                    required
                    onChange={handleChange}
                    name="address"
                    value={bien.address}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Address"
                />
                <input
                    required
                    onChange={handleChange}
                    name="price"
                    value={bien.price}
                    type="number"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Prix en Dirham"
                />

                <SelectOneChoiceBien bien={bien} />

                <input
                    required
                    onChange={handleChange}
                    name="location"
                    value={bien.location}
                    type="text"
                    class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Location"
                />
                <SelectOneChoiceBienStatus bien={bien} />
                <input
                    required
                    onChange={handleChange}
                    max="0.4"
                    min="0"
                    step="0.01"
                    name="comission"
                    value={bien.comission}
                    type="number"
                    class="login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Comission"
                />
                {!bien?.id && (
                    <input
                        required
                        onChange={handleChange}
                        name="client_email"
                        value={bien.client_email}
                        type="email"
                        class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                        placeholder="Client email"
                    />
                )}
                <textarea
                    onChange={handleChange}
                    rows="4"
                    maxlength="1000"
                    className="col-span-3 "
                    name="description"
                    value={bien.description}
                    placeholder="Description"
                    required
                ></textarea>

                <button
                    type="submit"
                    class="btn btn-primary mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                    {bien?.id ? "Modifier" : "Ajouter"}
                </button>
            </form>
        </motion.div>
    );
};

export default FormBien;
