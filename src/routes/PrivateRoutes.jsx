import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadCurrentUser } from "../reduxStore/slices/authSlice";
import { Snackbar } from "@mui/material";

const PrivateRoutes = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const token = localStorage.getItem("access_token");

	useEffect(() => {
		if (token && !isAuthenticated) {
			// Se o token existe, mas o usuário não está autenticado, carregar o usuário
			dispatch(loadCurrentUser());
		}
	}, [token, isAuthenticated, dispatch]);

	const [openSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		if (!isAuthenticated && !token) {
			setOpenSnackbar(true);
		}
	}, [isAuthenticated, token]);

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	if (!isAuthenticated && !token) {
		return (
			<>
				<Navigate to="/login" />
				<Snackbar
					open={openSnackbar}
					onClose={handleSnackbarClose}
					message="Autenticação necessária"
					autoHideDuration={3000}
				/>
			</>
		);
	}

	return <Outlet />;
};

export default PrivateRoutes;
