import React from "react";

const HeaderTitle = ({ title }) => {
    console.log({ title });
    return <div className="text-blue-500 text-4xl p-4">{title}</div>;
};

export default HeaderTitle;
