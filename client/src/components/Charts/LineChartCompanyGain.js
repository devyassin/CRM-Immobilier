import React from "react";
import ChartJS from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchAllFacture } from "../../store/factureSlice";

const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "La différence des ventes de cette année par rapport à l'année précédente",
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

// Filter the array based on the desired month
const filterByMonth = (desiredMonth, data) => {
    const filteredData = data.filter((obj) => {
        const date = new Date(obj.date_creation);
        const monthName = labels[date.getMonth()];
        return monthName === desiredMonth;
    });
    return filteredData;
};

const LineChartCompanyGain = () => {
    const dispatch = useDispatch();
    const [fill, setisfilled] = useState("false");
    const factures = useSelector((state) => state.factures.data);
    const status = useSelector((state) => state.factures.status);
    const error = useSelector((state) => state.factures.error);
    useEffect(() => {
        dispatch(fetchAllFacture(""));
    }, []);

    if (status === "loading") {
        return (
            <div className="col-span-3">
                <SkeletonTheme highlightColor="#f1f3f5">
                    <Skeleton height={400} />
                </SkeletonTheme>
            </div>
        );
    }

    if (status === "succeeded") {
        const facturesCurrentYear = factures.factures.filter((facture) => {
            return facture.date_creation.substring(0, 4) == currentYear;
        });

        const facturesPreviousYear = factures.factures.filter((facture) => {
            return facture.date_creation.substring(0, 4) == previousYear;
        });
        const getThesumOfsalesbyMonth = (label, data) => {
            const total = filterByMonth(label, data).reduce((acc, curr) => {
                return acc + Number(curr.biens.length);
            }, 0);
            return total;
        };

        const data = {
            labels,
            datasets: [
                {
                    fill: fill === "true" ? true : false,
                    label: currentYear.toString(),
                    data: labels.map((label) =>
                        getThesumOfsalesbyMonth(label, facturesCurrentYear)
                    ),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                {
                    fill: fill === "true" ? true : false,
                    label: previousYear.toString(),
                    data: labels.map((label) =>
                        getThesumOfsalesbyMonth(label, facturesPreviousYear)
                    ),
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
            ],
        };

        return (
            <div className="col-span-2">
                <div className="flex flex-col space-y-4  bg-white p-4 rounded-lg drop-shadow-lg">
                    <Line
                        className="  max-h-[400px]"
                        options={options}
                        data={data}
                    />
                    <div className="flex items-center space-x-8">
                        <h1 className="text-lg pl-2">Surface :</h1>
                        <label>
                            <input
                                className="mr-4"
                                type="radio"
                                value="true"
                                checked={fill == "true"}
                                onChange={(e) => {
                                    setisfilled(e.target.value);
                                }}
                            />
                            Oui
                        </label>
                        <label>
                            <input
                                className="mr-4"
                                type="radio"
                                value="false"
                                checked={fill == "false"}
                                onChange={(e) => {
                                    setisfilled(e.target.value);
                                }}
                            />
                            Non
                        </label>
                    </div>
                </div>
            </div>
        );
    }
};

export default LineChartCompanyGain;
