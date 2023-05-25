import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SelectOneChoiceBienForBon from "../../components/utils/form/SelectOneChoiceBienForBon";
import SelectOneChoiceProspect from "../../components/utils/form/SelectOneChoiceProspect";
import { MdAddBox } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";

import {
    Toastsuccess,
    ToastLoading,
    Toastfailed,
} from "../../components/utils/toast/Toast";
import {
    handleBonForm,
    addBon,
    UpdateOneBon,
    closeAlert,
    closeAlertUpdate,
    initialStatus,
    setEmail,
    fetchAllBons,
} from "../../store/BonSlice";

import {
    fetchOneBien,
    deleteBien,
    fetchAllBiens,
    handleBienForm,
    initialStatusTwo,
    addBien,
    setEmailCl,
} from "../../store/bienSlice";
import CopyRight from "../../components/utils/Copyright/CopyRight";

const FormBon = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let bon = useSelector((state) => state.bons.bon);
    const bien = useSelector((state) => state.biens.bien);
    const status = useSelector((state) => state.biens.status);
    const statusAddBien = useSelector((state) => state.biens.statusAddBien);
    const biens = useSelector((state) => state.biens.data);
    const client = useSelector((state) => state.clients.client);
    const leads = useSelector((state) => state.leads.data);
    const lead = useSelector((state) => state.leads.lead);
    const statusAddBon = useSelector((state) => state.bons.statusAddBon);
    const statusUpdateBon = useSelector((state) => state.bons.statusUpdateBon);
    const errorMessage = useSelector((state) => state.bons.error);
    const error = useSelector((state) => state.biens.error);

    useEffect(() => {
        dispatch(fetchAllBiens(["", "", "", "", "", "", "nonlocal"]));

        if (statusAddBon === "succeeded") {
            Toastsuccess("Bon de visite Ajouter !");
            setTimeout(() => {
                navigate("/bons");
            }, [1000]);
        }

        if (statusAddBon === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusAddBon === "loading") {
            ToastLoading("Bon de visite en cours d'ajout .....");
        }

        if (statusUpdateBon === "succeeded") {
            Toastsuccess("Bon de visite Modifier !");
            setTimeout(() => {
                navigate("/bons");
            }, [1000]);
        }

        if (statusUpdateBon === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusUpdateBon === "loading") {
            ToastLoading("Bon de visite en cours de modification .....");
        }

        dispatch(initialStatus());
    }, [statusAddBon, statusUpdateBon]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!bon?.id) {
            dispatch(addBon(bon));
        } else {
            const id = bon.id;
            bon = {
                date_visite: bon.date_visite,
                raison: bon.raison,
                accompagnateur: bon.accompagnateur,
                bien_id: bon.bien_id,
                lead_id: bon.lead_id,
                user_id: bon.user_id,
            };
            console.log(bon.date_visite + "fffff");
            dispatch(UpdateOneBon([id, bon]));
        }

        setTimeout(() => {
            dispatch(closeAlert());
            dispatch(closeAlertUpdate());
        }, 3000);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleBonForm({ name, value }));
    };

    const [isShow, setisShow] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between">
                <HeaderTitle
                    title={
                        bon?.id
                            ? "Modifier Bon de visite"
                            : "Ajouter Bon de visite"
                    }
                />
                <Link to="/bons">
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
                    <div className="flex flex-col space-y-10 lg:flex-row lg:space-y-0 col-span-2  justify-between w-full">
                        {!bon?.id && (
                            <div className="flex flex-col col-span-1 w-full items-start">
                                <label className="text-xl text-blue-300">
                                    Prospect
                                </label>
                                <SelectOneChoiceProspect />
                                {lead?.id && (
                                    <div className="flex flex-row h-[100px] ml-2 mt-8 space-x-6">
                                        <div className="flex flex-col space-y-4">
                                            <h1>tel :</h1>
                                            <h1>email :</h1>
                                            <h1>address :</h1>
                                        </div>
                                        <div className="flex flex-col space-y-4">
                                            <h1 className="max-w-[300px] opacity-70 break-words">
                                                {lead.tel}
                                            </h1>
                                            <h1 className="max-w-[300px] opacity-70 break-words">
                                                {lead.email}
                                            </h1>
                                            <h1 className="max-w-[300px] opacity-70 break-words">
                                                {lead.address}
                                            </h1>
                                        </div>
                                    </div>
                                )}

                                {lead?.id && (
                                    <div className="flex space-x-12 mt-4 ml-2">
                                        <h1>type :</h1>
                                        <h1 className="max-w-[300px] opacity-70 break-words">
                                            {lead.status}
                                        </h1>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <label className="text-xl text-blue-300">
                            Accompagnateur
                        </label>
                        <div className="lg:w-[400px]">
                            <input
                                required
                                onChange={handleChange}
                                type="text"
                                value={bon.accompagnateur}
                                name="accompagnateur"
                                class=" form-control py-3 px-4 block mt-4 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="text-xl text-blue-300">Raison</label>
                        <div className="lg:w-[400px]">
                            <input
                                required
                                onChange={handleChange}
                                type="text"
                                value={bon.raison}
                                name="raison"
                                class=" form-control py-3 px-4 block mt-4 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-6 col-span-2 md:col-span-1 ">
                        <label className="text-xl text-blue-300">
                            Date de visite
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            type="date"
                            value={bon.date_visite.substring(0, 10)}
                            name="date_visite"
                        />
                    </div>

                    <div className="flex flex-col items-start col-span-2 md:col-span-1">
                        <label className="text-xl text-blue-300">Biens</label>
                        <div className="w-full flex items-center">
                            <SelectOneChoiceBienForBon />
                        </div>
                    </div>

                    <div className="flex flex-col items-start col-span-2 md:col-span-1">
                        <button
                            type="submit"
                            class="btn btn-primary mt-8 py-4 text-2xl px-8 w-full xl:w-48 xl:mr-3 align-top"
                        >
                            {bon?.id ? "Modifier" : "Ajouter"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-20 text-[12px] ">
                <CopyRight />
            </div>
        </div>
    );
};

export default FormBon;
