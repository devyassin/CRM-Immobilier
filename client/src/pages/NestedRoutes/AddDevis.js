import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectMultipleChoiseBiens from "../../components/utils/form/SelectMultipleChoiseBiens";
import {
    Toastsuccess,
    ToastLoading,
    Toastfailed,
} from "../../components/utils/toast/Toast";
import {
    handleDevisForm,
    addDevis,
    UpdateOneDevis,
    setReference,
    closeAlert,
    closeAlertUpdate,
    initialStatus,
} from "../../store/devisSlice";

const AddDevis = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const devi = useSelector((state) => state.devis.devis);
    const statusAddDevis = useSelector((state) => state.devis.statusAddDevis);
    const statusUpdateDevis = useSelector(
        (state) => state.devis.statusUpdateDevis
    );
    const errorMessage = useSelector((state) => state.devis.error);
    let finalResult = null;

    useEffect(() => {
        if (!devi.id) {
            let randomNumber = Math.floor(Math.random() * 10000);
            let formattedNumber = randomNumber.toString().padStart(4, "0");
            finalResult = "#" + formattedNumber;
            dispatch(setReference({ finalResult }));
        }
    }, []);

    useEffect(() => {
        if (statusAddDevis === "succeeded") {
            Toastsuccess("Devis Ajouter !");
            setTimeout(() => {
                navigate("/devis");
            }, [1000]);
        }

        if (statusAddDevis === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusAddDevis === "loading") {
            ToastLoading("Devis en cours d'ajout .....");
        }

        if (statusUpdateDevis === "succeeded") {
            Toastsuccess("Devis Modifier !");
        }

        if (statusUpdateDevis === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusUpdateDevis === "loading") {
            ToastLoading("Devis en cours de modification .....");
        }

        dispatch(initialStatus());
    }, [statusAddDevis, statusUpdateDevis]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (!devi?.id) {
            dispatch(addDevis(devi));
        } else {
            dispatch(UpdateOneDevis([devi.id, devi]));
        }

        setTimeout(() => {
            dispatch(closeAlert());
            dispatch(closeAlertUpdate());
        }, 3000);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleDevisForm({ name, value }));
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <HeaderTitle
                    title={devi?.id ? "Modifier devis" : "Ajouter devis"}
                />
                <Link to="/devis">
                    <IoArrowBackCircleSharp
                        size={50}
                        className="cursor-pointer text-blue-400 hover:opacity-80 duration-150"
                    />
                </Link>
            </div>
            <form
                onSubmit={submitHandler}
                className="grid grid-cols-1 gap-x-32 gap-y-10 mt-16 px-4 md:grid-cols-2"
            >
                <div className="flex flex-col items-start">
                    <label className="text-xl text-blue-300">Reference</label>
                    <input
                        required
                        onChange={handleChange}
                        name="reference"
                        value={devi.reference}
                        type="text"
                        disabled
                        class="intro-x login__input form-control text-2xl  px-4 block mt-4 focus:outline-none"
                    />
                </div>
                {!devi?.id && (
                    <div className="flex flex-col items-start">
                        <label className="text-xl text-blue-300">
                            Email Client
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            name="client_email"
                            value={devi.client_email}
                            type="email"
                            class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                        />
                    </div>
                )}
                <div className="flex flex-col items-start col-span-2">
                    <label className="text-xl text-blue-300">Description</label>
                    <textarea
                        onChange={handleChange}
                        rows="4"
                        maxlength="1000"
                        className="w-full"
                        name="description"
                        value={devi.description}
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col items-start col-span-1">
                    <label className="text-xl text-blue-300">Biens</label>
                    <SelectMultipleChoiseBiens />
                </div>
                <div className="flex flex-col items-start col-span-1">
                    <label className="text-xl text-blue-300">Estimation</label>
                    <input
                        required
                        onChange={handleChange}
                        name="estimation"
                        value={devi.estimation}
                        type="number"
                        disabled
                        class="intro-x login__input form-control text-2xl  px-4 block mt-4 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col items-start col-span-1">
                    {/* <label className="text-xl text-blue-300">Estimation</label> */}
                    <button
                        type="submit"
                        class="btn btn-primary mt-8 py-4 text-2xl px-8 w-full xl:w-48 xl:mr-3 align-top"
                    >
                        {devi?.id ? "Modifier" : "Ajouter"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDevis;
