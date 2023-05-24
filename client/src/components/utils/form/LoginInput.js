import React from "react";

const LoginInput = ({ type, placeholder, value, onChangeHandler }) => {
    return (
        <input
            onChange={onChangeHandler}
            value={value}
            type={type}
            class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
            placeholder={placeholder}
        />
    );
};

export default LoginInput;
