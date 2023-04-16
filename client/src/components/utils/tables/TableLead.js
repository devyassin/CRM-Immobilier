import React from "react";
import { MdDelete, MdEmail, MdCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteLead, fetchOneLead } from "../../../store/leadSlice";
import { show } from "../../../store/overlaySlice";
import { notFound } from "../../../assets/images";
const TableLead = ({ fields }) => {
    const dispatch = useDispatch();
    const leadsGlobal = useSelector((state) => state.leads.data);

    const { leads, count } = leadsGlobal;
    if (count == 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-10">
                <img className="w-56 mt-20" src={notFound} />
                <h1 className="text-3xl font-semibold text-red-500">
                    Prospect Non trouvé
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
                                <th key={i} scope="col" class="px-6 py-3">
                                    {item}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => {
                        const status = lead.status;
                        let rank = lead.status.split(",").length;

                        let color = "";
                        switch (rank) {
                            case 1:
                                color = "bg-red-500";
                                break;
                            case 2:
                                color = "bg-blue-500";
                                break;
                            case 3:
                                color = "bg-green-500";
                                break;
                            default:
                                color = "bg-orange-500";
                                break;
                        }

                        return (
                            <tr
                                key={lead.id}
                                class="bg-white border-b hover:bg-gray-100 duration-150 "
                            >
                                <td class="px-6 py-4">{lead.nom}</td>
                                <td class="px-6 py-4">{lead.prenom}</td>
                                <td class="px-6 py-4">{lead.tel}</td>
                                <td class="px-6 py-4">{lead.address}</td>
                                <td class="px-6 py-4">{lead.email}</td>
                                <p
                                    className={`w-56 py-2 text-center text-white ${color} rounded-lg opacity-90`}
                                >
                                    {lead.status.replaceAll(",", " ")}
                                </p>
                                <td class="px-6 py-4">{lead.lead_source}</td>
                                <td class="px-6 py-4 flex space-x-2 mt-4">
                                    <MdDelete
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="red"
                                        onClick={() => {
                                            dispatch(deleteLead(lead.id));
                                        }}
                                    />
                                    <MdCreate
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="blue"
                                        onClick={() => {
                                            dispatch(fetchOneLead(lead.id));
                                            dispatch(dispatch(show()));
                                        }}
                                    />
                                    <a href={`mailto:${lead.email}`}>
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

export default TableLead;
