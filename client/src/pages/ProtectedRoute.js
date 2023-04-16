import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user.user);
    // const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
};

export default ProtectedRoute;
