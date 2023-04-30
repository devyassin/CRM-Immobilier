import React from "react";
import { Navigate } from "react-router-dom";

function Logout(params) {
    // Remove session data
localStorage.removeItem('token');
return <Navigate to="/login" />;
}


export default Logout;