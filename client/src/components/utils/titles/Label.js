import React from "react";

const Label = ({ title, content }) => {
    return (
        <div className="flex space-x-2 items-start pl-6  ">
            <h1 className="text-sm md:text-lg whitespace-nowrap lg:text-xl text-blue-400">
                {title} :
            </h1>
            <h2 className="text-sm md:text-base   lg:text-lg opacity-80">
                {content}
            </h2>
        </div>
    );
};

export default Label;
