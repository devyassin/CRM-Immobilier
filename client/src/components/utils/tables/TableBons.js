import React from "react";
import { MdDelete, MdEmail, MdCreate, MdLocalPrintshop } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteBon, fetchOneBon } from "../../../store/BonSlice";
import { show } from "../../../store/overlaySlice";
import { useNavigate } from "react-router-dom";
import { notFound } from "../../../assets/images";
const TableBons = ({ fields }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bonsGlobal = useSelector((state) => state.bons.data);

    const { bons, count } = bonsGlobal;
    if (count == 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-10">
                <img className="w-56 mt-20" src={notFound} />
                <h1 className="text-3xl font-semibold text-red-500">
                    Bon de visite Non trouvé
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
                    {bons.map((bon) => {
                        return (
                            <tr
                                key={bon.id}
                                class="bg-white border-b hover:bg-gray-100 duration-150 "
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {bon.lead.nom}
                                </td>

                                <td class="px-6 py-4 whitespace-nowrap">
                                    {bon.lead.tel}
                                </td>
                                <td class="px-6 py-4">{bon.lead.email}</td>
                                <td class="px-6 py-4 ">{bon.accompagnateur}</td>

                                <td class="px-6 py-4">{bon.bien.NomBien}</td>
                                <td class="px-6 py-4">{bon.raison}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {bon.date_visite.substring(0, 11)}
                                </td>

                                <td class="px-6 py-4 flex space-x-2 mt-4">
                                    <MdDelete
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="red"
                                        onClick={() => {
                                            dispatch(deleteBon(bon.id));
                                        }}
                                    />
                                    <MdCreate
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="blue"
                                        onClick={async () => {
                                            await dispatch(fetchOneBon(bon.id));
                                            navigate("/bons/FormBon");
                                        }}
                                    />
                                    <a>
                                        <MdLocalPrintshop
                                            className="duration-150 cursor-pointer hover:opacity-60"
                                            size={20}
                                            color="orange"
                                            onClick={() => {
                                                navigate(`/bons/${bon.id}`);
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

export default TableBons;
