import React from "react";
import { MdDelete, MdEmail, MdCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneTransaction } from "../../../store/transactionSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { notFound } from "../../../assets/images";
const TableTransaction = ({ fields }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const transactionsGlobal = useSelector((state) => state.transactions.data);

    const { transactions, count } = transactionsGlobal;
    if (count == 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-10">
                <img className="w-56 mt-20" src={notFound} />
                <h1 className="text-3xl font-semibold text-red-500">
                    Transaction Non trouvé
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
                    {transactions.map((transaction) => {
                        const type = transaction.type;

                        let color = "";
                        switch (type) {
                            case "gain":
                                color = "bg-green-500";
                                break;
                            default:
                                color = "bg-red-500";
                                break;
                        }

                        return (
                            <tr
                                key={transaction.id}
                                class="bg-white border-b hover:bg-gray-100 duration-150 "
                            >
                                <td class="px-6 py-4">#0000{transaction.id}</td>
                                <td class="px-6 py-4">{transaction.prix} DH</td>
                                <td class="px-6 py-4">
                                    {transaction.mode_payement}
                                </td>
                                <p
                                    class={` py-1 mt-3 text-center text-white ${color} rounded-lg opacity-90`}
                                >
                                    {transaction.type}
                                </p>
                                <td class="px-6 py-4">
                                    {transaction.comission}
                                </td>

                                <td class="px-6 py-4">
                                    {transaction.created_at
                                        .substring(0, 19)
                                        .replace("T", "  ")}
                                </td>
                                <td class="px-6 py-4">
                                    <FaArrowAltCircleRight
                                        className="duration-150  cursor-pointer hover:opacity-60"
                                        size={20}
                                        onClick={() => {
                                            navigate(
                                                `/transactions/${transaction.id}`
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableTransaction;
