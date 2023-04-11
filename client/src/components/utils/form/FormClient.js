import React from "react";
import LoginInput from "./LoginInput";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../../store/overlaySlice";

const FormClient = () => {
    const dispatch = useDispatch();
    const visibility = useSelector((state) => state.overlay.show);
    return (
        <div className="bg-white p-6 w-full md:max-w-3xl rounded-lg shadow-lg absolute top-1/2 left-1/2 -translate-y-2/3 -translate-x-1/2 z-40">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl text-blue-500">Ajouter un client</h1>
                <AiFillCloseCircle
                    onClick={() => dispatch(hide())}
                    className="cursor-pointer hover:opacity-75 duration-150 text-red-500"
                    size={30}
                />
            </div>

            <form className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <LoginInput type="text" placeholder="First Name" />
                <LoginInput type="text" placeholder="Last Name" />

                <label for="underline_select" class="sr-only">
                    Underline select
                </label>
                <select
                    id="underline_select"
                    class="block  pt-6 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                    <option selected>Personal business</option>
                    <option value="US">Buyer</option>
                    <option value="CA">Seller</option>
                    <option value="FR">Renter</option>
                    <option value="DE">Big company</option>
                </select>
                <LoginInput type="tel" placeholder="Phone" />
                <LoginInput type="text" placeholder="Address" />
                <LoginInput type="email" placeholder="Email" />

                <button
                    type="submit"
                    class="btn btn-primary mt-8 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default FormClient;
