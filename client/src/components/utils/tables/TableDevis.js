import React from "react";
import { MdDelete, MdEmail, MdCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteDevis, fetchOneDevis } from "../../../store/devisSlice";
import { useNavigate } from "react-router-dom";
import { show } from "../../../store/overlaySlice";
import { notFound } from "../../../assets/images";
const TableDevis = ({ fields }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const devisGlobal = useSelector((state) => state.devis.data);

    const { devis, count } = devisGlobal;
    if (count == 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-10">
                <img className="w-56 mt-20" src={notFound} />
                <h1 className="text-3xl font-semibold text-red-500">
                    Devis Non trouvé
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
                    {devis.map((devi) => {
                        return (
                            <tr
                                key={devi.id}
                                class="bg-white border-b hover:bg-gray-100 duration-150 "
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {"#0000" + devi.id}
                                </td>
                                <td class="px-6 py-4">{devi.client.nom}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {devi.client.tel}
                                </td>
                                <td class="px-6 py-4">{devi.client.email}</td>
                                <td class="px-6 py-4 whitespace-nowrap ">
                                    {devi.estimation + "DH"}
                                </td>

                                <td class="px-6 py-4">{devi.biens.length}</td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    {devi.date_creation.substring(0, 10)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {devi.date_experation.substring(0, 10)}
                                </td>

                                <td class="px-6 py-4 flex space-x-2 mt-4">
                                    <MdDelete
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="red"
                                        onClick={() => {
                                            dispatch(deleteDevis(devi.id));
                                        }}
                                    />
                                    <MdCreate
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="blue"
                                        onClick={async () => {
                                            await dispatch(
                                                fetchOneDevis(devi.id)
                                            );
                                            navigate("/devis/FormDevis");
                                        }}
                                    />
                                    <a href={`mailto:${devi.client.email}`}>
                                        <MdEmail
                                            className="duration-150 cursor-pointer hover:opacity-60"
                                            size={20}
                                            color="orange"
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

export default TableDevis;
