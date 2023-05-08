import React from "react";
import ChartJS from "chart.js/auto";
import { Line, Pie, Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
    fetchAllTachesAfaire,
    fetchAllTachesEnCours,
    fetchAllTachesTermine,
} from "../../store/tacheSlice";

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Répartition des Taches par Status",
        },
    },
};

const labels = ["À faire", "En cours ", "Terminé"];

const numberByStatus = (data) => {
    return Number(data.count);
};

const PieChartTacheStatus = () => {
    const dispatch = useDispatch();
    const progressList = useSelector((state) => state.taches.progress);
    const doneList = useSelector((state) => state.taches.done);
    const todosList = useSelector((state) => state.taches.todo);
    const statusTodo = useSelector((state) => state.taches.statusTodo);
    const statusProgress = useSelector(
        (state) => state.taches.statusInprogress
    );
    const statusDone = useSelector((state) => state.taches.statusDone);
    const error = useSelector((state) => state.taches.error);
    useEffect(() => {
        dispatch(fetchAllTachesEnCours());
        dispatch(fetchAllTachesAfaire());
        dispatch(fetchAllTachesTermine());
    }, []);

    if (
        statusTodo === "loading" ||
        statusProgress === "loading" ||
        statusDone === "loading"
    ) {
        return (
            <div className="col-span-2 md:col-span-1">
                <SkeletonTheme highlightColor="#f1f3f5">
                    <Skeleton height={400} />
                </SkeletonTheme>
            </div>
        );
    }

    if (
        statusTodo === "succeeded" &&
        statusProgress === "succeeded" &&
        statusDone === "succeeded"
    ) {
        const data = {
            labels,
            datasets: [
                {
                    data: labels.map((label) => {
                        if (label === labels[0]) {
                            return numberByStatus(todosList);
                        } else if (label == labels[1]) {
                            return numberByStatus(progressList);
                        } else {
                            return numberByStatus(doneList);
                        }
                    }),
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
                <Doughnut
                    className=" bg-white p-4 rounded-lg drop-shadow-lg"
                    options={options}
                    data={data}
                />
            </div>
        );
    }
};

export default PieChartTacheStatus;
