import React from "react";
import { useState } from "react";

const LoginInput = ({ type, placeholder, value }) => {
    const [entredValue, setEntredValue] = useState("");
    return (
        <input
            onChange={(e) => setEntredValue(e.target.value)}
            value={value ? value : entredValue}
            type={type}
            class="intro-x login__input form-control py-3 px-4 block mt-4 focus:outline-none"
            placeholder={placeholder}
        />
    );
};

export default LoginInput;
