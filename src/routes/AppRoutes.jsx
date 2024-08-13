import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import SignIn from "../pages/auth/SignIn";
import UserInfo from "../pages/auth/UserInfo";

const AppRoutes = () => {
	return (
		<Routes>
			{/* Rota de login */}
			<Route path="/login" element={<SignIn />} />

			{/* Rotas protegidas */}
			<Route element={<PrivateRoutes />}>
				<Route path="/" element={<div>Home - Protegido</div>} />
				<Route path="/user-info" element={<UserInfo />} />
			</Route>

			{/* Redirecionamento de rotas desconhecidas para login */}
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
};

export default AppRoutes;
