import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectMultipleChoiseBiens from "../../components/utils/form/SelectMultipleChoiseBiens";
import SelectOneChoiceStatFacture from "../../components/utils/form/SelectOneChoiceStatFacture";
import SelectOneChoicePaiFacture from "../../components/utils/form/SelectOneChoicePaiFacture";
import SelectOneChoiceClient from "../../components/utils/form/SelectOneChoiceClient";
import { MdDelete, MdSettings } from "react-icons/md";
import {
    Toastsuccess,
    ToastLoading,
    Toastfailed,
} from "../../components/utils/toast/Toast";
import {
    handleFactureForm,
    addFacture,
    UpdateOneFacture,
    closeAlert,
    closeAlertUpdate,
    initialStatus,
    setEmail,
    fetchAllFacture,
} from "../../store/factureSlice";
import {
    addTransaction,
    fetchAllTransactions,
    UpdateOneTransaction,
} from "../../store/transactionSlice";
import { fetchAllBiens } from "../../store/bienSlice";

import { fetchOneBien } from "../../store/bienSlice";

const FormFacture = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [factureObj, setFactureObj] = useState(null);
    const facture = useSelector((state) => state.factures.facture);
    const bien = useSelector((state) => state.biens.bien);
    const transactions = useSelector((state) => state.transactions.data);
    const status = useSelector((state) => state.biens.status);
    const biens = useSelector((state) => state.biens.data);
    const client = useSelector((state) => state.clients.client);
    const statusAddFacture = useSelector(
        (state) => state.factures.statusAddFacture
    );
    const statusUpdateFacture = useSelector(
        (state) => state.factures.statusUpdateFacture
    );
    const errorMessage = useSelector((state) => state.factures.error);

    useEffect(() => {
        dispatch(fetchAllBiens(["", "", "", "", "", "", "nonlocal"]));
        dispatch(fetchAllTransactions(``));
        if (statusAddFacture === "succeeded") {
            Toastsuccess("Facture Ajouter !");

            biens.biens.map((bien) => {
                if (factureObj.biens.includes(bien.id)) {
                    const transaction = {
                        prix: bien.price,
                        mode_payement: factureObj.mode_payment,
                        comission: bien.comission,
                        type: "gain",
                        date_transaction: factureObj.date_creation,
                        bien_id: bien.id,
                        user_id: bien.user_id,
                    };
                    dispatch(addTransaction(transaction));
                }
            });
            setTimeout(() => {
                navigate("/facture");
            }, [1000]);
        }

        if (statusAddFacture === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusAddFacture === "loading") {
            ToastLoading("Facture en cours d'ajout .....");
        }

        if (statusUpdateFacture === "succeeded") {
            const localTransactions = transactions.transactions.filter(
                (transaction) => factureObj.biens.includes(transaction.bien_id)
            );

            // need some improvements to update transactions . i will return to it later

            Toastsuccess("Facture Modifier !");
            setTimeout(() => {
                navigate("/facture");
            }, [1000]);
        }

        if (statusUpdateFacture === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusUpdateFacture === "loading") {
            ToastLoading("Facture en cours de modification .....");
        }

        dispatch(initialStatus());
    }, [statusAddFacture, statusUpdateFacture]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!facture?.id) {
            setFactureObj(facture);

            dispatch(addFacture(facture));
        } else {
            setFactureObj(facture);
            dispatch(UpdateOneFacture([facture.id, facture]));
        }

        setTimeout(() => {
            dispatch(closeAlert());
            dispatch(closeAlertUpdate());
        }, 3000);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleFactureForm({ name, value }));
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <HeaderTitle
                    title={facture?.id ? "Modifier facture" : "Ajouter facture"}
                />
                <Link to="/facture">
                    <IoArrowBackCircleSharp
                        size={50}
                        className="cursor-pointer text-blue-400 hover:opacity-80 duration-150"
                    />
                </Link>
            </div>
            <div className="bg-white px-2 py-3 rounded-lg">
                <form
                    onSubmit={submitHandler}
                    className="grid grid-cols-1 gap-x-32 gap-y-10 mt-16 px-4 md:grid-cols-2"
                >
                    <div className="flex flex-col col-span-2 w-full items-start">
                        <div className="flex flex-col space-y-10 lg:flex-row lg:space-y-0  justify-between w-full">
                            {!facture?.id && (
                                <div>
                                    <label className="text-xl text-blue-300">
                                        Client
                                    </label>
                                    <div className="w-[400px]">
                                        <SelectOneChoiceClient type="facture" />
                                    </div>

                                    {client?.id && (
                                        <div className="flex flex-row h-[100px] ml-2 mt-8 space-x-6">
                                            <div className="flex flex-col space-y-4">
                                                <h1>tel :</h1>
                                                <h1>email :</h1>
                                                <h1>address :</h1>
                                            </div>
                                            <div className="flex flex-col space-y-4">
                                                <h1 className="max-w-[300px] opacity-70 break-words">
                                                    {client.tel}
                                                </h1>
                                                <h1 className="max-w-[300px] opacity-70 break-words">
                                                    {client.email}
                                                </h1>
                                                <h1 className="max-w-[300px] opacity-70 break-words">
                                                    {client.address}
                                                </h1>
                                            </div>
                                        </div>
                                    )}

                                    {client?.id && (
                                        <div className="flex space-x-12 mt-4 ml-2">
                                            <h1>type :</h1>
                                            <h1 className="max-w-[300px] opacity-70 break-words">
                                                {client.type}
                                            </h1>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div>
                                <div>
                                    <label className="text-xl text-blue-300">
                                        Status
                                    </label>
                                    <div className="lg:w-[400px]">
                                        <SelectOneChoiceStatFacture
                                            facture={facture}
                                        />
                                    </div>
                                </div>
                                <div className="mt-24">
                                    <label className="text-xl text-blue-300">
                                        Mode paiement
                                    </label>
                                    <div className="lg:w-[400px]">
                                        <SelectOneChoicePaiFacture
                                            facture={facture}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full justify-between">
                        <div className="flex flex-col space-y-2">
                            <label className="text-md text-blue-300">
                                Date de creation
                            </label>
                            <input
                                required
                                onChange={handleChange}
                                type="date"
                                value={facture.date_creation.substring(0, 10)}
                                name="date_creation"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-md text-blue-300">
                                Date d'experation
                            </label>
                            <input
                                required
                                onChange={handleChange}
                                type="date"
                                value={facture.date_experation.substring(0, 10)}
                                name="date_experation"
                            />
                        </div>
                    </div>
                    <hr className="col-span-2"></hr>
                    <div className="flex flex-col items-start col-span-2 md:col-span-1">
                        <label className="text-xl text-blue-300">Biens</label>
                        <SelectMultipleChoiseBiens type="facture" />
                    </div>
                    <div className="flex flex-col items-start col-span-2 md:col-span-1">
                        <label className="text-xl text-blue-300">
                            Estimation
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            name="prix_total"
                            value={facture.prix_total}
                            type="number"
                            disabled
                            class="intro-x login__input form-control text-2xl  px-4 block mt-4 focus:outline-none"
                        />
                    </div>
                    <div class="col-span-2  mt-10 shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left  text-gray-500 ">
                            <thead class="text-md text-blue-400  bg-gray-50 ">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 whitespace-nowrap"
                                    >
                                        Nom Bien
                                    </th>

                                    <th
                                        scope="col"
                                        class="px-6 py-3 whitespace-nowrap"
                                    >
                                        description
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 whitespace-nowrap"
                                    >
                                        status
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 whitespace-nowrap"
                                    >
                                        prix
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 whitespace-nowrap"
                                    >
                                        comission
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {status === "succeeded" &&
                                    facture.biens.map((id) => {
                                        const bien = biens.biens.filter(
                                            (bien) => bien.id === id
                                        );

                                        const status = bien[0].status;
                                        let rank = bien[0].status;

                                        let color = "";
                                        switch (rank) {
                                            case "disponible":
                                                color = "bg-green-500";
                                                break;
                                            case "en location":
                                                color = "bg-blue-500";
                                                break;
                                            default:
                                                color = "bg-orange-500";
                                                break;
                                        }

                                        return (
                                            <tr
                                                key={bien[0].id}
                                                class="bg-white border-b hover:bg-gray-100 duration-150 "
                                            >
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    {bien[0].NomBien}
                                                </td>

                                                <td class="px-6 py-4">
                                                    {bien[0].description}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p
                                                        className={`w-44 py-2 text-center text-white ${color} rounded-lg opacity-90`}
                                                    >
                                                        {bien[0].status}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {bien[0].price + "DH"}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {bien[0].comission}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col items-start col-span-1">
                        <button
                            type="submit"
                            class="btn btn-primary mt-8 py-4 text-2xl px-8 w-full xl:w-48 xl:mr-3 align-top"
                        >
                            {facture?.id ? "Modifier" : "Ajouter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormFacture;
