import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoutes = () => {
	const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
	console.log(`isAuthenticated: ${isAuthenticated}`);

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return <Outlet />;
};

export default AuthRoutes;
