import React from "react";
import LoginInput from "./LoginInput";

const FormClient = () => {
    return (
        <div className="bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40">
            <h1>Add client</h1>
            <form>
                <LoginInput type="email" placeholder="Email" />
                <LoginInput type="email" placeholder="Email" />
                <LoginInput type="email" placeholder="Email" />
                <LoginInput type="email" placeholder="Email" />
            </form>
        </div>
    );
};

export default FormClient;
