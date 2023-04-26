import React from "react";
import { MdDelete, MdEmail, MdCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteBien, fetchOneBien } from "../../../store/bienSlice";
import { show } from "../../../store/overlaySlice";
import { notFound } from "../../../assets/images";
const TableBien = ({ fields }) => {
    const dispatch = useDispatch();
    const biensGlobal = useSelector((state) => state.biens.data);

    const { biens, count } = biensGlobal;
    if (count == 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-10">
                <img className="w-56 mt-20" src={notFound} />
                <h1 className="text-3xl font-semibold text-red-500">
                    Bien Non trouvé
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
                    {biens.map((bien) => {
                        const status = bien.status;
                        let rank = bien.status;

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
                                key={bien.id}
                                class="bg-white border-b hover:bg-gray-100 duration-150 "
                            >
                                <td class="px-6 py-4">{bien.client.nom}</td>
                                <td class="px-6 py-4">{bien.client.email}</td>
                                <td class="px-6 py-4 ">{bien.address}</td>
                                <td class="px-6 py-4">
                                    <p
                                        className={`w-44 py-2 text-center text-white ${color} rounded-lg opacity-90`}
                                    >
                                        {bien.status}
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    {bien.description.slice(0, 30) +"..."}
                                </td>
                                <td class="px-6 py-4">{bien.type}</td>
                                <td class="px-6 py-4">{bien.price + "DH"}</td>
                                <td class="px-6 py-4">{bien.location}</td>
                                <td class="px-6 py-4">{bien.comission}</td>
                                <td class="px-6 py-4">{bien.created_at.substring(0,10)}</td>
                                <td class="px-6 py-4 flex space-x-2 mt-4">
                                    <MdDelete
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="red"
                                        onClick={() => {
                                            dispatch(deleteBien(bien.id));
                                        }}
                                    />
                                    <MdCreate
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="blue"
                                        onClick={() => {
                                            dispatch(fetchOneBien(bien.id));
                                            dispatch(dispatch(show()));
                                        }}
                                    />
                                    <a href={`mailto:${bien.client.email}`}>
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

export default TableBien;
