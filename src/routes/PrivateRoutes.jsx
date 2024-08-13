import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Snackbar } from "@mui/material";

const PrivateRoutes = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	// console.log("isAuthenticated: ", isAuthenticated);

	const [openSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		if (!isAuthenticated) {
			setOpenSnackbar(true);
		}
	}, [isAuthenticated]);

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	if (!isAuthenticated) {
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
