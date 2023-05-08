import React from "react";
import ChartJS from "chart.js/auto";
import { Line, Pie, Doughnut } from "react-chartjs-2";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAllBiens } from "../../store/bienSlice";

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Répartition des biens par status",
        },
    },
};

const labels = ["disponible", "en location", "vendu"];

const numberByStatus = (desiredType, data) => {
    const filteredData = data.filter((obj) => {
        return obj.status == desiredType;
    });
    return Number(filteredData.length);
};

const PieChartBienStatus = () => {
    const dispatch = useDispatch();
    const biens = useSelector((state) => state.biens.data);
    const status = useSelector((state) => state.biens.status);
    const error = useSelector((state) => state.biens.error);
    useEffect(() => {
        dispatch(fetchAllBiens(["", "", "", "", ""]));
    }, []);

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
        const data = {
            labels,
            datasets: [
                {
                    data: labels.map((label) =>
                        numberByStatus(label, biens.biens)
                    ),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(9, 255, 71, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(9, 255, 71, 1)",
                        "rgba(255, 206, 86, 1)",
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

export default PieChartBienStatus;
