import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    console.warn(user);
    console.warn(token);
    if (!user || !token) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
};

export default ProtectedRoute;
