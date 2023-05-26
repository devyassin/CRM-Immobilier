import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useInView } from "react-intersection-observer";
import { notFound } from "../../assets/images";
import "react-loading-skeleton/dist/skeleton.css";
import {
    fetchAllTransactions,
    setGlobalState,
} from "../../store/transactionSlice";

import TransactionCard from "../utils/cards/TransactionCard";

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");

let currentDate = year + "-" + month + "-" + day;

const TransactionsTracking = () => {
    const dispatch = useDispatch();
    const [ref, inView] = useInView();
    const [visible, setIsVisible] = useState(false);
    const transactions = useSelector((state) => state.transactions.data);
    const status = useSelector((state) => state.transactions.status);
    const error = useSelector((state) => state.transactions.error);
    const filterName = useSelector((state) => state.transactions.filterName);
    const filterMinPrice = useSelector(
        (state) => state.transactions.filterMinPrice
    );
    const filterMaxPrice = useSelector(
        (state) => state.transactions.filterMaxPrice
    );
    useEffect(() => {
        if (inView && !visible) {
            setIsVisible(true);
            dispatch(
                fetchAllTransactions([
                    filterMinPrice,
                    filterMaxPrice,
                    filterName,
                ])
            );
        }
    }, [inView]);

    if (status === "loading" || status !== "succeeded") {
        return (
            <div ref={ref} className="col-span-2 md:col-span-1">
                <SkeletonTheme highlightColor="#f1f3f5">
                    <Skeleton height={400} />
                </SkeletonTheme>
            </div>
        );
    }

    if (status === "succeeded") {
        const todayTransactions = transactions.transactions.filter(
            (transaction) =>
                transaction.created_at.substring(0, 10) == currentDate
        );
        if (todayTransactions.length == 0) {
            return (
                <div
                    ref={ref}
                    className="col-span-2 md:col-span-1 flex flex-col bg-white p-4 rounded-lg drop-shadow-lg "
                >
                    <h1 className="text-center font-semibold opacity-70 mt-4 mb-2">
                        Les transactions d'aujourd'hui
                    </h1>
                    <div className="flex flex-col p-2 space-y-2 overflow-x-auto rounded-lg overflow-scroll tableScroll  bg-gray-100 h-[400px]">
                        <div className="flex flex-col items-center justify-center space-y-10">
                            <img className="w-48 mt-20" src={notFound} />
                            <h1 className="text-2xl font-semibold text-red-500">
                                Aucune transaction aujourd'hui
                            </h1>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    ref={ref}
                    className="col-span-2 md:col-span-1 flex flex-col bg-white p-4 rounded-lg drop-shadow-lg "
                >
                    <h1 className="text-center font-semibold opacity-70 mt-4 mb-2">
                        Les transactions d'aujourd'hui
                    </h1>
                    <div className="flex flex-col p-2 space-y-2 overflow-x-auto rounded-lg overflow-scroll tableScroll  bg-gray-100 h-[400px]">
                        {todayTransactions.map((transaction) => {
                            return (
                                <TransactionCard
                                    key={transaction.id}
                                    transaction={transaction}
                                />
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
};

export default TransactionsTracking;
