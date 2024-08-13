import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const UserInfo = () => {
	const user = useSelector((state) => state.auth.user);

	if (!user) {
		return <Typography>Loading...</Typography>;
	}
	console.log("user: ", user);
	console.log("user.id_user: ", user.id_user);
	console.log("user.username: ", user.username);
	console.log("user.role: ", user.role);

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4">Informações do Usuário</Typography>
			<Typography variant="body1">
				<strong>ID:</strong> {user.id_user}
			</Typography>
			<Typography variant="body1">
				<strong>Username:</strong> {user.username}
			</Typography>
			<Typography variant="body1">
				<strong>Full Name:</strong> {user.full_name}
			</Typography>
			<Typography variant="body1">
				<strong>Email:</strong> {user.email}
			</Typography>
			<Typography variant="body1">
				<strong>Role:</strong> {user.role ? user.role : "N/A"}
			</Typography>
		</Box>
	);
};

export default UserInfo;
