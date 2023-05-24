import React from "react";
import { TfiStatsUp, TfiStatsDown } from "react-icons/tfi";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { MdAccountBalance } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

const TransactionCard = ({ transaction }) => {
    return (
        <div
            className={`flex flex-col space-y-1 ${
                transaction.type === "gain" ? "bg-green-200 " : "bg-red-200"
            } p-2 rounded-lg`}
        >
            <h1 className="text-right text-[11px] font-semibold opacity-70">
                {transaction.created_at.substring(10, 19).replace("T", " ")}
            </h1>
            <div className="flex justify-between items-center">
                <div className="flex space-x-1 items-end">
                    <div className="bg-black p-1 rounded-full">
                        <FaBuilding className="text-blue-500" />
                    </div>
                    <span className="font-semibold text-[10px] ">
                        {transaction.bien.NomBien}
                    </span>
                </div>
                <div className="flex space-x-2 items-start">
                    {transaction.type === "gain" ? (
                        <TfiStatsUp className="text-green-700" />
                    ) : (
                        <TfiStatsDown className="text-red-700" />
                    )}
                    {transaction.type === "gain" ? (
                        <h1 className="font-semibold text-[10px]">
                            +
                            {Math.floor(
                                transaction.prix * transaction.comission
                            )}{" "}
                            Dh
                        </h1>
                    ) : (
                        <h1 className="font-semibold text-[10px]">
                            -
                            {Math.floor(
                                transaction.prix * transaction.comission
                            )}{" "}
                            Dh
                        </h1>
                    )}
                </div>
                <div className="flex space-x-2 items-center">
                    {transaction.mode_payement === "carte de crédit" ? (
                        <BsFillCreditCard2BackFill />
                    ) : transaction.mode_payement === "espèces" ? (
                        <GrMoney />
                    ) : (
                        <MdAccountBalance />
                    )}
                    <h1 className="font-semibold text-[10px]">
                        {transaction.mode_payement}
                    </h1>
                </div>
                <div className="flex space-x-2 items-center">
                    <FaUserTie />
                    <h1 className="text-[10px] font-semibold">
                        {transaction.client.nom} {transaction.client.prenom}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
