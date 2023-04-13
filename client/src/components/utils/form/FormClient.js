import React from "react";
import LoginInput from "./LoginInput";
import { AiFillCloseCircle } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { hide } from "../../../store/overlaySlice";
import {
    clearClientUpdate,
    addClient,
    handleClientForm,
} from "../../../store/clientSlice";

const FormClient = ({ client }) => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleClientForm({ name, value }));
    };
    return (
        <div className="absolute z-40 w-full p-6 -translate-x-1/2 bg-white rounded-lg shadow-lg md:max-w-3xl top-1/2 left-1/2 -translate-y-2/3">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl text-blue-500">
                    {client.id ? "Modifier Client" : "Ajouter un client"}
                </h1>
                <AiFillCloseCircle
                    onClick={() => {
                        dispatch(hide());
                        if (client.id) {
                            dispatch(clearClientUpdate());
                        }
                    }}
                    className="text-red-500 duration-150 cursor-pointer hover:opacity-75"
                    size={30}
                />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!client.id) {
                        dispatch(addClient(client));
                        dispatch(clearClientUpdate());
                        dispatch(hide());
                    }
                }}
                className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
                <input
                    onChange={handleChange}
                    name="nom"
                    value={client.nom}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="First Name"
                />
                <input
                    onChange={handleChange}
                    name="prenom"
                    value={client.prenom}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Last Name"
                />

                <label for="underline_select" class="sr-only">
                    Underline select
                </label>
                <select
                    onChange={handleChange}
                    value={client.type}
                    name="type"
                    id="underline_select"
                    class="block  pt-6 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Renter">Renter</option>
                    <option value="Big company">Big company</option>
                </select>

                <input
                    onChange={handleChange}
                    name="tel"
                    value={client.tel}
                    type="tel"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Phone"
                />
                <input
                    onChange={handleChange}
                    name="address"
                    value={client.address}
                    type="text"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Address"
                />

                <input
                    onChange={handleChange}
                    name="email"
                    value={client.email}
                    type="email"
                    class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                    placeholder="Email"
                />

                <input
                    onChange={handleChange}
                    type="date"
                    value={client.last_contacted.substring(0, 10)}
                    name="last_contacted"
                />
                <div></div>
                <div></div>

                <button
                    type="submit"
                    class="btn btn-primary mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                    {client.id ? "Modifier" : "Ajouter"}
                </button>
            </form>
        </div>
    );
};

export default FormClient;
