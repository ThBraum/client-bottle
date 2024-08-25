import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			align="center"
			{...props}
			sx={{
				color: (theme) =>
					theme.palette.mode === "dark" ? "#d8d8d8" : theme.palette.text.secondary,
			}}
		>
			{"Copyright © "}
			<Link color="inherit">ClientBottle</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				py: 3,
				px: 2,
				mt: "auto",
				width: "100%",
				backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#17212e" : "#e0e0e0"),
			}}
		>
			<Container maxWidth="sm">
				<Copyright />
			</Container>
		</Box>
	);
}
