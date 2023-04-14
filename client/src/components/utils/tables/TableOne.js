import React from "react";
import { MdDelete, MdEmail, MdCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteClient, fetchOneClient } from "../../../store/clientSlice";
import { show } from "../../../store/overlaySlice";
import { notFound } from "../../../assets/images";


const TableOne = () => {
    const dispatch = useDispatch();
    const clientsGlobal = useSelector((state) => state.clients.data);

    const { clients, count } = clientsGlobal;

    if (count == 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-10">
                <img className="w-56 mt-20" src={notFound} />
                <h1 className="text-3xl font-semibold text-red-500">
                    Client Not found
                </h1>
            </div>
        );
    }

    return (
        <div class="relative   overflow-x-auto overflow-scroll tableScroll h-80 md:h-[400px] mt-10 shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left  text-gray-500 ">
                <thead class="text-md text-blue-400  bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            last Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone
                        </th>

                        <th scope="col" class="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Last Contacted
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => {
                        const type = client.type;
                        let rank = client.type.split(",").length;

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
                                key={client.id}
                                class="bg-white border-b hover:bg-gray-100 duration-150 "
                            >
                                <td class="px-6 py-4">{client.nom}</td>
                                <td class="px-6 py-4">{client.prenom}</td>
                                <td class="px-6 py-4">
                                    <p
                                        className={`w-44 py-2 text-center text-white ${color} rounded-lg opacity-90`}
                                    >
                                        {client.type.replaceAll(",", " ")}
                                    </p>
                                </td>
                                <td class="px-6 py-4">{client.tel}</td>
                                <td class="px-6 py-4">{client.address}</td>
                                <td class="px-6 py-4">{client.email}</td>
                                <td class="px-6 py-4">
                                    {client.last_contacted}
                                </td>
                                <td class="px-6 py-4 flex space-x-2 mt-4">
                                    <MdDelete
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="red"
                                        onClick={() => {
                                            dispatch(deleteClient(client.id));
                                        }}
                                    />
                                    <MdCreate
                                        className="duration-150 cursor-pointer hover:opacity-60"
                                        size={20}
                                        color="blue"
                                        onClick={() => {
                                            dispatch(fetchOneClient(client.id));
                                            dispatch(dispatch(show()));
                                        }}
                                    />
                                    <a href={`mailto:${client.email}`}>
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

export default TableOne;
