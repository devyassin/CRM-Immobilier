import React from "react";

const LoginInput = ({ type, placeholder }) => {
    return (
        <input
            type={type}
            class="intro-x login__input form-control py-3 px-4 block mt-4"
            placeholder={placeholder}
        />
    );
};

export default LoginInput;
