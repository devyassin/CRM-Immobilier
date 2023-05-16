import React from "react";
import ChartJS from "chart.js/auto";
import { Line, Pie, Radar } from "react-chartjs-2";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAllBiens } from "../../store/bienSlice";

const options = {
    responsive: true,
    scales: {
        r: {
            ticks: {
                max: 6000, // Maximum value on the axis
                min: 0, // Minimum value on the axis
                stepSize: 1, // Interval between ticks
            },
        },
    },
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Répartition des types biens par status",
        },
    },
};

const labels = [
    "Appartement",
    "Maison individuelle",
    "Maison mitoyenne",
    "Maison de ville",
    "Maison de campagne",
    "Ferme",
    "Studio",
    "Duplex",
    "Triplex",
    "Loft",
    "Penthouse",
    "Château",
    "Manoir",
    "Villa",
    "Bungalow",
    "Terrain",
    "Garage",
    "Parking",
    "Autres",
];
const numberByStatus = (desiredType, desiredStatus, data) => {
    const filteredData = data.filter((obj) => {
        return obj.type == desiredType && obj.status == desiredStatus;
    });
    return Number(filteredData.length);
};

const RadarChartTypeBien = () => {
    const dispatch = useDispatch();
    const biens = useSelector((state) => state.biens.data);
    const status = useSelector((state) => state.biens.status);
    const error = useSelector((state) => state.biens.error);

    if (status === "loading") {
        console.log("loading");
        return (
            <div className="col-span-2 ">
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
                    label: "disponible",
                    data: labels.map((label) =>
                        numberByStatus(label, "disponible", biens.biens)
                    ),
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    borderWidth: 1,
                },
                {
                    label: "en location",
                    data: labels.map((label) =>
                        numberByStatus(label, "en location", biens.biens)
                    ),
                    borderColor: "rgba(9, 255, 71)",
                    backgroundColor: "rgba(9, 255, 71, 0.5)",
                    borderWidth: 1,
                },
                {
                    label: "vendu",
                    data: labels.map((label) =>
                        numberByStatus(label, "vendu", biens.biens)
                    ),
                    borderColor: "rgba(255, 206, 86)",
                    backgroundColor: "rgba(255, 206, 86,0.5)",
                    borderWidth: 1,
                },
            ],
        };

        return (
            <div className="col-span-2 ">
                <Radar
                    className=" bg-white max-h-[800px]  p-4 rounded-lg drop-shadow-lg"
                    options={options}
                    data={data}
                />
            </div>
        );
    }
};

export default RadarChartTypeBien;
