import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import SignIn from "../pages/auth/SignIn";
import UserInfo from "../pages/auth/UserInfo";
import TransactionTable from "components/Transaction/TransactionTable";
import SidenavLayout from "components/Layout/SidenavLayout";

const AppRoutes = ({ mode, toggleColorMode }) => {
	return (
		<Routes>
			{/* Rota de login */}
			<Route path="/login" element={<SignIn mode={mode} toggleColorMode={toggleColorMode} />} />

			{/* Rotas protegidas */}
			<Route element={<PrivateRoutes />}>
				<Route element={<SidenavLayout mode={mode} toggleColorMode={toggleColorMode} />}>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/user-info" element={<UserInfo />} />
					<Route path="/transactions" element={<TransactionTable />} />
				</Route>
			</Route>

			{/* Redirecionamento de rotas desconhecidas para login */}
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
};

export default AppRoutes;
