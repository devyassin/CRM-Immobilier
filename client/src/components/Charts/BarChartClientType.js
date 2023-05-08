import React from "react";
import ChartJS from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAllClients } from "../../store/clientSlice";

const currentYear = new Date().getFullYear();

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: `Répartition mensuelle des clients par type au long de l'année ${currentYear}`,
        },
    },
};

const labels = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
];

const filterByMonth = (desiredMonth, data) => {
    const filteredData = data.filter((obj) => {
        const date = new Date(obj.last_contacted);
        console.log(date);
        const monthName = labels[date.getMonth()];
        console.log(monthName);
        return monthName === desiredMonth;
    });
    return filteredData;
};

const BarChartClientType = () => {
    const dispatch = useDispatch();

    const clients = useSelector((state) => state.clients.data);
    const status = useSelector((state) => state.clients.status);
    const error = useSelector((state) => state.clients.error);
    useEffect(() => {
        dispatch(fetchAllClients(""));
    }, []);

    if (status === "loading") {
        return (
            <div className="col-span-2">
                <SkeletonTheme highlightColor="#f1f3f5">
                    <Skeleton height={400} />
                </SkeletonTheme>
            </div>
        );
    }

    if (status === "succeeded") {
        const clientsCurrentYear = clients.clients.filter((client) => {
            return client.created_at.substring(0, 4) == currentYear;
        });

        const getThesumOfClientsbyTypeInMonth = (label, data, type) => {
            const total = filterByMonth(label, data).filter((item) => {
                return item.type.includes(type);
            }).length;

            return total;
        };

        const data = {
            labels,
            datasets: [
                {
                    label: "Locataire",
                    data: labels.map((label) =>
                        getThesumOfClientsbyTypeInMonth(
                            label,
                            clientsCurrentYear,
                            "Locataire"
                        )
                    ),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    label: "Acheteur",
                    data: labels.map((label) =>
                        getThesumOfClientsbyTypeInMonth(
                            label,
                            clientsCurrentYear,
                            "Acheteur"
                        )
                    ),
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },

                {
                    label: "Grande entreprise",
                    data: labels.map((label) =>
                        getThesumOfClientsbyTypeInMonth(
                            label,
                            clientsCurrentYear,
                            "Grande entreprise"
                        )
                    ),
                    borderColor: "rgba(9, 255, 71)",
                    backgroundColor: "rgba(9, 255, 71, 0.5)",
                },
                {
                    label: "Vendeur",
                    data: labels.map((label) =>
                        getThesumOfClientsbyTypeInMonth(
                            label,
                            clientsCurrentYear,
                            "Vendeur"
                        )
                    ),
                    borderColor: "rgba(255, 206, 86)",
                    backgroundColor: "rgba(255, 206, 86, 0.5)",
                },
            ],
        };

        return (
            <div className="col-span-2">
                <div className="flex flex-col space-y-4  bg-white p-4 rounded-lg drop-shadow-lg">
                    <Bar
                        className="  max-h-[400px]"
                        options={options}
                        data={data}
                    />
                </div>
            </div>
        );
    }
};

export default BarChartClientType;
