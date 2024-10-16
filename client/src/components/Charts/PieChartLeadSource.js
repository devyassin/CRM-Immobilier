import React from "react";
import ChartJS from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAllLeads } from "../../store/leadSlice";

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Répartition des prospects par source",
        },
    },
};

const labels = ["référence", "en ligne", "médias sociaux", "portes ouvertes"];

const numberBySource = (desiredType, data) => {
    const filteredData = data.filter((obj) => {
        return obj.lead_source === desiredType;
    });
    return Number(filteredData.length);
};

const PieChartLeadSource = () => {
    const dispatch = useDispatch();
    const leads = useSelector((state) => state.leads.data);
    const status = useSelector((state) => state.leads.status);
    const error = useSelector((state) => state.leads.error);
    useEffect(() => {
        dispatch(fetchAllLeads(""));
    }, []);

    if (status !== "succeeded") {
        return (
            <div className="col-span-2 md:col-span-1">
                <SkeletonTheme highlightColor="#f1f3f5">
                    <Skeleton height={400} />
                </SkeletonTheme>
            </div>
        );
    }

    if (status === "succeeded") {
        const number = numberBySource("référence", leads.leads);

        const data = {
            labels,
            datasets: [
                {
                    data: labels.map((label) =>
                        numberBySource(label, leads.leads)
                    ),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(9, 255, 71, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(9, 255, 71, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        return (
            <div className="col-span-2 md:col-span-1">
                <Pie
                    className=" bg-white p-4 rounded-lg drop-shadow-lg"
                    options={options}
                    data={data}
                />
            </div>
        );
    }
};

export default PieChartLeadSource;
