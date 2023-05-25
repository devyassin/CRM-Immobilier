import React from "react";
import HeaderTitle from "../../components/utils/titles/HeaderTitle";
import { useEffect } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneTransaction } from "../../store/transactionSlice";
import { FaUserAlt, FaBuilding, FaDollarSign } from "react-icons/fa";
import Label from "../../components/utils/titles/Label";
import CopyRight from "../../components/utils/Copyright/CopyRight";

const TransactionDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const transaction = useSelector(
        (state) => state.transactions.transaction.data
    );
    const status = useSelector(
        (state) => state.transactions.statusGetTransaction
    );

    useEffect(() => {
        dispatch(fetchOneTransaction(id));
    }, []);
    if (status === "loading") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title="Transaction Detail" />
                    <Link to="/transactions">
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

    if (status === "succeeded") {
        return (
            <div>
                <div className="flex items-center justify-between">
                    <HeaderTitle title="Transaction Detail" />
                    <Link to="/transactions">
                        <IoArrowBackCircleSharp
                            size={50}
                            className="cursor-pointer text-blue-400 hover:opacity-80 duration-150"
                        />
                    </Link>
                </div>
                <div className="flex items-center justify-center  ">
                    <div className="flex flex-col w-full  py-6 space-y-14 bg-white rounded-lg">
                        {/* Item  1 */}
                        <div className="flex flex-col">
                            {/* Header of icon */}
                            <div className="flex flex-col items-center">
                                <hr className="bg-black  w-full rounded-lg" />
                                <div className="bg-blue rounded-full p-3 -translate-y-5">
                                    <FaUserAlt
                                        className="  text-white"
                                        size={25}
                                    />
                                </div>
                            </div>
                            {/* Content */}
                            <div className="grid grid-cols-1  lg:grid-cols-2 gap-x-40 gap-y-5 md:gap-y-10 mt-4">
                                <Label
                                    title="Nom complet "
                                    content={`${transaction.client.nom}  ${transaction.client.prenom}`}
                                />
                                <Label
                                    title="Tel "
                                    content={`${transaction.client.tel}`}
                                />

                                <Label
                                    title="Email"
                                    content={transaction.client.email}
                                />
                                <Label
                                    title="Address"
                                    content={transaction.client.address}
                                />
                                <Label
                                    title="Type"
                                    content={transaction.client.type}
                                />
                                <Label
                                    title="Dernier contact"
                                    content={transaction.client.updated_at
                                        .substring(0, 19)
                                        .replace("T", " ")}
                                />
                            </div>
                        </div>
                        {/* Item  2*/}
                        <div>
                            {/* Header of icon */}
                            <div className="flex flex-col items-center">
                                <hr className="bg-black  w-full rounded-lg" />
                                <div className="bg-blue rounded-full p-3 -translate-y-5">
                                    <FaBuilding
                                        className="  text-white"
                                        size={25}
                                    />
                                </div>
                            </div>
                            {/* Content */}
                            <div className="grid grid-cols-1 gap-x-40  lg:grid-cols-2  gap-y-5 md:gap-y-10 mt-4">
                                <Label
                                    title="Nom bien "
                                    content={`${transaction.bien.NomBien}`}
                                />
                                <Label
                                    title="Commission"
                                    content={`${transaction.bien.comission}`}
                                />

                                <Label
                                    title="Type"
                                    content={transaction.bien.type}
                                />
                                <Label
                                    title="Location"
                                    content={transaction.bien.location}
                                />
                                <Label
                                    title="Prix"
                                    content={`${transaction.bien.price} DH`}
                                />
                                <Label
                                    title="Status"
                                    content={transaction.bien.status}
                                />
                                <div className="flex flex-col justify-center w-full col-span-1 mt-2 md:col-span-2">
                                    <h1 className="text-sm mb-4 text-center md:text-lg whitespace-nowrap lg:text-xl text-blue-400">
                                        Description
                                    </h1>
                                    <h2 className="text-sm md:text-base text-center px-6   lg:text-lg opacity-80">
                                        {transaction.bien.description}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        {/* Item  3*/}
                        <div>
                            {/* Header of icon */}
                            <div className="flex flex-col items-center">
                                <hr className="bg-black  w-full rounded-lg" />
                                <div className="bg-blue rounded-full p-3 -translate-y-5">
                                    <FaDollarSign
                                        className="  text-white"
                                        size={25}
                                    />
                                </div>
                            </div>
                            {/* Content */}
                            <div className="grid grid-cols-1  lg:grid-cols-2 gap-x-40 gap-y-5 md:gap-y-10 mt-4">
                                <Label
                                    title="Mode payement "
                                    content={`${transaction.mode_payement}`}
                                />
                                <Label
                                    title="Type "
                                    content={`${transaction.type}`}
                                />

                                <Label
                                    title="Date transaction"
                                    content={transaction.created_at
                                        .substring(0, 19)
                                        .replace("T", " ")}
                                />
                                <Label
                                    title="Somme"
                                    content={`${Math.floor(
                                        transaction.prix * transaction.comission
                                    )} DH`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 text-[12px] ">
                    <CopyRight />
                </div>
            </div>
        );
    }
};

export default TransactionDetail;
