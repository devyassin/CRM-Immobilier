import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SelectMultipleChoiseBiens from "../../components/utils/form/SelectMultipleChoiseBiens";
import SelectOneChoiceClient from "../../components/utils/form/SelectOneChoiceClient";
import { MdAddBox } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";

import {
    Toastsuccess,
    ToastLoading,
    Toastfailed,
} from "../../components/utils/toast/Toast";
import {
    handleDevisForm,
    addDevis,
    UpdateOneDevis,
    closeAlert,
    closeAlertUpdate,
    initialStatus,
    addBienToDevis,
    removeBienFromDevis,
    setEmail,
    fetchAllDevis,
} from "../../store/devisSlice";

import {
    fetchOneBien,
    deleteBien,
    fetchAllBiens,
    handleBienForm,
    initialStatusTwo,
    addBien,
    setEmailCl,
} from "../../store/bienSlice";

const FormDevis = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const devi = useSelector((state) => state.devis.devis);
    const bien = useSelector((state) => state.biens.bien);
    const status = useSelector((state) => state.biens.status);
    const statusAddBien = useSelector((state) => state.biens.statusAddBien);
    const biens = useSelector((state) => state.biens.data);
    const client = useSelector((state) => state.clients.client);
    const statusAddDevis = useSelector((state) => state.devis.statusAddDevis);
    const statusUpdateDevis = useSelector(
        (state) => state.devis.statusUpdateDevis
    );
    const errorMessage = useSelector((state) => state.devis.error);
    const error = useSelector((state) => state.biens.error);

    useEffect(() => {
        dispatch(fetchAllBiens(["", "", "", "", "", "", "nonlocal"]));

        if (statusAddDevis === "succeeded") {
            console.log("nice ------->");
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
            setTimeout(() => {
                navigate("/devis");
            }, [1000]);
        }

        if (statusUpdateDevis === "failed") {
            Toastfailed(errorMessage);
        }

        if (statusUpdateDevis === "loading") {
            ToastLoading("Devis en cours de modification .....");
        }

        dispatch(initialStatus());
    }, [statusAddDevis, statusUpdateDevis]);

    useEffect(() => {
        if (statusAddBien === "failed") {
            Toastfailed(error);
        }
        if (statusAddBien === "succeeded") {
            console.log(title);
            //now i will search the bien by title then get the id and add it to the array in the devis sclice
            biens.biens.map((bien) => {
                if (bien.NomBien == title) {
                    const id = bien.id;
                    dispatch(addBienToDevis({ id }));
                }
            });
        }

        dispatch(initialStatusTwo());
    }, [statusAddBien]);

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

    const submitHandlerNonLocalDevis = (e) => {
        e.preventDefault();
        setTitle(bien.NomBien);
        dispatch(addBien(bien));
    };

    const handleChangeNonLocalBien = (event) => {
        const { name, value } = event.target;

        dispatch(handleBienForm({ name, value }));
        if (!devi?.id) {
            console.log(devi);
            const email = client.email;
            dispatch(setEmailCl({ email }));
        } else {
            const email = devi.client.email;
            console.log(email);
            dispatch(setEmailCl({ email }));
        }
    };

    const [isShow, setisShow] = useState(false);
    const [title, setTitle] = useState("");

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
            <div className="bg-white px-2 py-3 rounded-lg">
                <form
                    onSubmit={submitHandler}
                    className="grid grid-cols-1 gap-x-32 gap-y-10 mt-16 px-4 md:grid-cols-2"
                >
                    {!devi?.id && (
                        <div className="flex flex-col col-span-2 w-full items-start">
                            <label className="text-xl text-blue-300">
                                Client
                            </label>
                            <SelectOneChoiceClient />
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
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col space-y-2">
                            <label className="text-md text-blue-300">
                                Date de creation
                            </label>
                            <input
                                required
                                onChange={handleChange}
                                type="date"
                                value={devi.date_creation.substring(0, 10)}
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
                                value={devi.date_experation.substring(0, 10)}
                                name="date_experation"
                            />
                        </div>
                    </div>
                    <hr className="col-span-2"></hr>
                    <div className="flex flex-col items-start col-span-2 md:col-span-1">
                        <label className="text-xl text-blue-300">Biens</label>
                        <div className="w-full flex items-center">
                            <SelectMultipleChoiseBiens type="devis" />
                            {isShow === true ? (
                                <AiFillCloseSquare
                                    onClick={() => {
                                        setisShow((prev) => !prev);
                                    }}
                                    size={59}
                                    className="text-red-500 cursor-pointer hover:opacity-80 duration-150 mt-5"
                                />
                            ) : (
                                <MdAddBox
                                    onClick={() => {
                                        setisShow((prev) => !prev);
                                    }}
                                    size={59}
                                    className="text-blue-500 cursor-pointer hover:opacity-80 duration-150 mt-5"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-start col-span-2 md:col-span-1">
                        <label className="text-xl text-blue-300">
                            Estimation
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            name="estimation"
                            value={devi.estimation}
                            type="number"
                            disabled
                            class=" login__input form-control text-2xl  px-4 block mt-4 focus:outline-none"
                        />
                    </div>

                    <motion.div
                        animate={{
                            y: isShow === true ? 0 : "-70%",
                            opacity: isShow === true ? 1 : 0,
                        }}
                        initial={{
                            y: "-70%",
                            opacity: 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                        }}
                        className="w-full col-span-2 "
                    >
                        <div className="flex flex-col md:flex-row items-center w-full space-x-4">
                            <input
                                onChange={handleChangeNonLocalBien}
                                name="NomBien"
                                value={bien.NomBien}
                                type="text"
                                class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                                placeholder="Nom Bien"
                            />
                            <textarea
                                className="w-full md:w-fit mt-4 md:mt-0"
                                onChange={handleChangeNonLocalBien}
                                cols="200"
                                maxlength="1000"
                                name="description"
                                value={bien.description}
                                placeholder="Description"
                            ></textarea>
                            <input
                                onChange={handleChangeNonLocalBien}
                                name="price"
                                value={bien.price}
                                type="number"
                                class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                                placeholder="Prix en Dirham"
                            />
                            <input
                                onChange={handleChangeNonLocalBien}
                                max="0.4"
                                min="0"
                                step="0.01"
                                name="comission"
                                value={bien.comission}
                                type="number"
                                class="login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                                placeholder="Comission"
                            />
                            {client.email !== "" && (
                                <button onClick={submitHandlerNonLocalDevis}>
                                    <FaCheckSquare
                                        type="button"
                                        className="mt-4 text-blue-500 cursor-pointer "
                                        size={40}
                                    />
                                </button>
                            )}
                            {devi.id && client.email === "" && (
                                <button onClick={submitHandlerNonLocalDevis}>
                                    <FaCheckSquare
                                        type="button"
                                        className="mt-4 text-blue-500 cursor-pointer "
                                        size={40}
                                    />
                                </button>
                            )}
                        </div>
                    </motion.div>
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
                                    devi.biens.map((id) => {
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
                                                <td class="flex items-center px-6 py-4">
                                                    {bien[0].comission}

                                                    {bien[0].exict ===
                                                        "nonlocal" && (
                                                        <MdDelete
                                                            className="duration-150 ml-4 cursor-pointer hover:opacity-60"
                                                            size={20}
                                                            color="red"
                                                            onClick={() => {
                                                                const { id } =
                                                                    bien[0];

                                                                dispatch(
                                                                    removeBienFromDevis(
                                                                        id
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
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
        </div>
    );
};

export default FormDevis;
