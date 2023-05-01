import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SelectMultipleChoiseBiens from "../../components/utils/form/SelectMultipleChoiseBiens";
import { handleDevisForm, setReference } from "../../store/devisSlice";

const AddDevis = () => {
    const dispatch = useDispatch();
    const devi = useSelector((state) => state.devis.devis);
    let finalResult = null;

    useEffect(() => {
        if (!devi.id) {
            let randomNumber = Math.floor(Math.random() * 10000);
            let formattedNumber = randomNumber.toString().padStart(4, "0");
            finalResult = "#" + formattedNumber;
            dispatch(setReference({ finalResult }));
        }
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
    };
    const handleChange = (event) => {
        const { name, value } = event.target;

        dispatch(handleDevisForm({ name, value }));
    };

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
            <form
                onSubmit={submitHandler}
                className="grid grid-cols-1 gap-x-32 gap-y-10 mt-16 px-4 md:grid-cols-2"
            >
                <div className="flex flex-col items-start">
                    <label className="text-xl text-blue-300">Reference</label>
                    <input
                        required
                        onChange={handleChange}
                        name="reference"
                        value={devi.reference}
                        type="text"
                        disabled
                        class="intro-x login__input form-control text-2xl  px-4 block mt-4 focus:outline-none"
                    />
                </div>
                {!devi?.id && (
                    <div className="flex flex-col items-start">
                        <label className="text-xl text-blue-300">
                            Email Client
                        </label>
                        <input
                            required
                            onChange={handleChange}
                            name="client_email"
                            value={devi.client_email}
                            type="email"
                            class=" login__input form-control py-3 px-4 block mt-4 focus:outline-none"
                        />
                    </div>
                )}
                <div className="flex flex-col items-start col-span-2">
                    <label className="text-xl text-blue-300">Description</label>
                    <textarea
                        onChange={handleChange}
                        rows="4"
                        maxlength="1000"
                        className="w-full"
                        name="description"
                        value={devi.description}
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col items-start col-span-1">
                    <label className="text-xl text-blue-300">Biens</label>
                    <SelectMultipleChoiseBiens />
                </div>
                <div className="flex flex-col items-start col-span-1">
                    <label className="text-xl text-blue-300">Estimation</label>
                    <input
                        required
                        onChange={handleChange}
                        name="estimation"
                        value={devi.estimation}
                        type="number"
                        disabled
                        class="intro-x login__input form-control text-2xl  px-4 block mt-4 focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddDevis;
