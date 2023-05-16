import React from "react";
import ChartJS from "chart.js/auto";
import { Bar, PolarArea } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAllTransactions } from "../../store/transactionSlice";

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: `Répartition des méthodes de paiement `,
        },
    },
};

const labels = ["espèces", "carte de crédit", "virement bancaire"];

const BarChartMethodePaiement = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.data);
    const status = useSelector((state) => state.transactions.status);
    const error = useSelector((state) => state.transactions.error);
    
    if (status === "loading") {
        return (
            <div className="col-span-2 md:col-span-1">
                <SkeletonTheme highlightColor="#f1f3f5">
                    <Skeleton height={400} />
                </SkeletonTheme>
            </div>
        );
    }
    if (status === "succeeded") {
        const numberByMethode = (desiredType, data) => {
            const filteredData = data.filter((obj) => {
                return obj.mode_payement === desiredType;
            });
            return Number(filteredData.length);
        };

        const data = {
            labels,
            datasets: [
                {
                    data: labels.map((label) =>
                        numberByMethode(label, transactions.transactions)
                    ),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(9, 255, 71, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(9, 255, 71, 1)",
                        "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        return (
            <div className="col-span-2 md:col-span-1">
                <div className=" bg-white p-4 rounded-lg  drop-shadow-lg">
                    <PolarArea options={options} data={data} />
                </div>
            </div>
        );
    }
};

export default BarChartMethodePaiement;
