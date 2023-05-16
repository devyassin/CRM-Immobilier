import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ColumnSkelton = ({ type }) => {
    return (
        <SkeletonTheme
            highlightColor={`${
                type === "red"
                    ? "#ffe3e3  "
                    : type === "blue"
                    ? "#d0ebff"
                    : type === "green"
                    ? "#d3f9d8"
                    : ""
            }`}
            className="flex flex-col drop-shadow-xl  "
        >
            {/* titre */}
            <div className={`text-2xl  rounded-t-lg p-4`}>
                <span className={``}>
                    <Skeleton height={400} />
                </span>
            </div>
            {/* taches */}
            <SkeletonTheme
                className={`flex flex-col p-2 space-y-2 overflow-x-auto overflow-scroll tableScroll ${
                    type === "red"
                        ? "#ffe3e3"
                        : type === "blue"
                        ? "#d0ebff"
                        : type === "green"
                        ? "#d3f9d8"
                        : ""
                }   h-[400px]`}
            ></SkeletonTheme>
        </SkeletonTheme>
    );
};

export default ColumnSkelton;
