import React, { Children } from "react";

const Wrapper = ({ children }) => {
    return (
        <div className="content rounded-t-lg md:rounded-none z-30 overflow-y-auto  h-96 tableScroll ">
            <div className="">{children}</div>
        </div>
    );
};

export default Wrapper;
