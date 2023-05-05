import React from "react";
import { MdDelete, MdLocalPrintshop, MdCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteFacture, fetchOneFacture } from "../../../store/factureSlice";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { notFound } from "../../../assets/images";
import { fetchAllBiens } from "../../../store/bienSlice";

const TableFacture = ({ fields }) => {
    const ref = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const factureGlobal = useSelector((state) => state.factures.data);

    const { factures, count } = factureGlobal;

    if (count == 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-10">
                <img className="w-56 mt-20" src={notFound} />
                <h1 className="text-3xl font-semibold text-red-500">
                    Facture Non trouvé
                </h1>
            </div>
        );
    }
    return (
        <div class="relative   overflow-x-auto overflow-scroll tableScroll h-80 md:h-[400px] mt-10 shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left  text-gray-500 ">
                <thead class="text-md text-blue-400  bg-gray-50 ">
                    <tr>
                        {fields.map((item, i) => {
                            return (
                                <th
                                    key={i}
                                    scope="col"
                                    class="px-6 py-3 whitespace-nowrap"
                                >
                                    {item}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {factures.map((facture) => {
                        const status = facture.status;
                        let rank = facture.status;

                        let color = "";
                        switch (rank) {
                            case "payé":
                                color = "bg-green-500";
                                break;

                            default:
                                color = "bg-red-500";
                                break;
                        }
                        return (
                            <tr
                                key={facture.id}
                                class="bg-white border-b hover:bg-gray-100 duration-150 "
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {"#0000" + facture.id}
                                </td>
                                <td class="px-6 py-4">{facture.client.nom}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {facture.client.tel}
                                </td>
                                <td class="px-6 py-4">
                                    {facture.client.email}
                                </td>
                                <td class="px-6 py-4">
                                    <p
                                        className={`w-44 py-2 text-center text-white ${color} rounded-lg opacity-90`}
                                    >
                                        {facture.status}
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    {facture.mode_payment}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {facture.prix_total + "DH"}
                                </td>

                                <td class="px-6 py-4">
                                    {facture.biens.length}
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    {facture.date_creation.substring(0, 10)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {facture.date_experation.substring(0, 10)}
                                </td>

                                <td class="px-6 py-4 flex space-x-2 mt-4">
                                    <MdDelete
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="red"
                                        onClick={() => {
                                            dispatch(deleteFacture(facture.id));
                                        }}
                                    />
                                    <MdCreate
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="blue"
                                        onClick={async () => {
                                            await dispatch(
                                                fetchOneFacture(facture.id)
                                            );
                                            navigate("/facture/FormFacture");
                                        }}
                                    />

                                    <a>
                                        <MdLocalPrintshop
                                            className="duration-150 cursor-pointer hover:opacity-60"
                                            size={20}
                                            color="orange"
                                            onClick={() => {
                                                navigate(
                                                    `/facture/${facture.id}`
                                                );
                                            }}
                                        />
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableFacture;
