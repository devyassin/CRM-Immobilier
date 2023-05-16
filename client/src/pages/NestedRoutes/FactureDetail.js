import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { logo, icon, pngwing } from "../../assets/images";
import { useEffect } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBiens } from "../../store/bienSlice";
import { fetchOneFacture, setGlobalStatus } from "../../store/factureSlice";
import { useRef } from "react";
import ReactPrint from "react-to-print";

const FactureDetail = () => {
    const ref = useRef();
    const { id } = useParams();

    const dispatch = useDispatch();
    const facture = useSelector((state) => state.factures.facture);
    const user = useSelector((state) => state.user.user);
    const status = useSelector((state) => state.factures.status);
    const statusBiens = useSelector((state) => state.biens.status);
    const biens = useSelector((state) => state.biens.data);

    useEffect(() => {
        dispatch(fetchAllBiens(["", "", "", "", "", ""]));
        dispatch(fetchOneFacture(id));
    }, []);
    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title="Imprimer Facture" />
                    <Link to="/facture">
                        <IoArrowBackCircleSharp
                            size={50}
                            className="cursor-pointer text-blue-400 hover:opacity-80 duration-150"
                        />
                    </Link>
                </div>
                <div className="flex items-center justify-center mt-40 ">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (facture.reference !== "" && statusBiens === "succeeded") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title="Imprimer Facture" />
                    <Link
                        to="/facture"
                        onClick={() => {
                            dispatch(setGlobalStatus({}));
                        }}
                    >
                        <IoArrowBackCircleSharp
                            size={50}
                            className="cursor-pointer text-blue-400 hover:opacity-80 duration-150"
                        />
                    </Link>
                </div>
                <div
                    ref={ref}
                    className="flex p-6 flex-col space-y-14 bg-white rounded-lg"
                >
                    <div className="flex justify-between">
                        <img className="w-48" src={pngwing} />
                        <div className="flex flex-col items-end">
                            <h1 className="text-4xl font-semibold">Facture</h1>
                            <h2 className="text-xl text-gray-600">
                                {`#0000` + facture.id}
                            </h2>
                            {facture.status === "payé" ? (
                                <h1 className="text-xl text-green-400">payé</h1>
                            ) : (
                                <h1 className="text-xl text-red-400">
                                    non réglé
                                </h1>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between pl-4 pb-10">
                        <div className="flex flex-col">
                            <h1 className="text-md font-bold">{user.name}</h1>
                            <p className=" max-w-[200px] break-words">
                                {user.address}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <h1 className="text-md font-bold">A :</h1>
                            <p className="font-semibold text-gray-500">
                                {facture.client.nom}
                            </p>
                            <p className="max-w-[200px] break-words text-right">
                                {facture.client.address}
                            </p>
                            <div className="flex items-center mt-4">
                                <div className="flex flex-col items-start  ">
                                    <h3 className="font-semibold">
                                        Date de creation :
                                    </h3>
                                    <h3 className="font-semibold">
                                        Date d'experation :
                                    </h3>
                                </div>
                                <div className="flex flex-col space-x-1 ">
                                    <p>
                                        {facture.date_creation.substring(0, 10)}
                                    </p>
                                    <p>
                                        {facture.date_experation.substring(
                                            0,
                                            10
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-24  bg-neutral-800 font-medium  text-white">
                        <div class="text-center  flex justify-start  px-6   py-4">
                            Nom Bien
                        </div>
                        <div class="text-center flex justify-start px-6  pr-10 w-[260px]    py-4">
                            Description
                        </div>
                        <div class="text-center flex justify-start px-6 w-[150px]  pl-28 py-4">
                            Prix
                        </div>
                        <div class="text-center  flex justify-start px-6 pl-28  py-4">
                            comission
                        </div>
                    </div>
                    <table class="min-w-full -translate-y-28  text-center text-sm font-light ">
                        <thead class="border-b thed opacity-0 bg-neutral-800 font-medium  text-white dark:border-neutral-500 dark:bg-neutral-900">
                            <tr className="">
                                <th scope="col" class="text-left px-6  py-4">
                                    Nom Bien
                                </th>
                                <th scope="col" class="text-left px-6  py-4">
                                    Description
                                </th>
                                <th scope="col" class="text-left px-6 py-4">
                                    Prix
                                </th>
                                <th scope="col" class="text-left  px-6  py-4">
                                    comission
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {facture.biens.map((id) => {
                                const bien = biens.biens.filter(
                                    (bien) => bien.id === id
                                );

                                return (
                                    <tr class="border-b dark:border-neutral-500">
                                        <td class=" max-w-[50px] py-4 text-left px-6 whitespace-nowrap font-medium">
                                            {bien[0].NomBien}
                                        </td>
                                        <td class=" text-left opacity-80 text-sm px-6 max-w-[200px] py-4 font-medium">
                                            {bien[0].description}
                                        </td>
                                        <td class=" py-4 text-left px-6 font-medium">
                                            {bien[0].price} Dh
                                        </td>

                                        <td class="max-w-[50px] py-4 text-left px-6 font-medium">
                                            {bien[0].comission}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr class="border-b bg-gray-200">
                                <td class=" max-w-[50px] py-4 text-left px-6 font-medium"></td>
                                <td class=" text-left opacity-80 text-sm px-6 max-w-[200px] py-4 font-medium"></td>
                                <td class=" py-4 text-left text-lg px-6 font-medium">
                                    Prix Total :
                                </td>

                                <td class="max-w-[50px] py-4 text-left px-6 font-medium">
                                    {facture.prix_total} Dh
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ReactPrint
                    trigger={() => (
                        <button className="btn btn-primary  mt-8 py-3 px- ml-2 w-full xl:w-32 xl:mr-3 align-top">
                            Imprimer
                        </button>
                    )}
                    content={() => ref.current}
                />
            </div>
        );
    }
};

export default FactureDetail;
