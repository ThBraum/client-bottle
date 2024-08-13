import React, { useState } from "react";
import {
	Avatar,
	Box,
	Button,
	FormControl,
	FormLabel,
	Link,
	TextField,
	Typography,
	InputAdornment,
	IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";
import ForgotPassword from "./ForgotPassword";

function SignInForm({ handleSubmit }) {
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const validateInputs = () => {
		const email = document.getElementById("email");
		const password = document.getElementById("password");

		let isValid = true;

		// if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
		// 	setEmailError(true);
		// 	setEmailErrorMessage("Please enter a valid email address.");
		// 	isValid = false;
		// } else {
		// 	setEmailError(false);
		// 	setEmailErrorMessage("");
		// }

		// if (!password.value || password.value.length < 3) {
		// 	setPasswordError(true);
		// 	setPasswordErrorMessage("Password must be at least 6 characters long.");
		// 	isValid = false;
		// } else {
		// 	setPasswordError(false);
		// 	setPasswordErrorMessage("");
		// }

		return isValid;
	};

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			noValidate
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				gap: 2,
			}}
		>
			<FormControl>
				<FormLabel
					htmlFor="email"
					sx={{ fontSize: "0.99rem", display: "flex", alignItems: "center" }}
				>
					Email ou username
				</FormLabel>
				<TextField
					error={emailError}
					helperText={emailErrorMessage}
					id="email"
					type="email"
					name="email"
					placeholder="example@email.com"
					autoComplete="email"
					autoFocus
					required
					fullWidth
					variant="outlined"
					color={emailError ? "error" : "primary"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton edge="end" aria-label="email icon">
									<MailIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<FormLabel htmlFor="password" sx={{ fontSize: "0.99rem" }}>
						Senha
					</FormLabel>
				</Box>
				<TextField
					error={passwordError}
					helperText={passwordErrorMessage}
					name="password"
					placeholder="••••••"
					type={showPassword ? "text" : "password"}
					id="password"
					autoComplete="current-password"
					required
					fullWidth
					variant="outlined"
					color={passwordError ? "error" : "primary"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleTogglePasswordVisibility}
									edge="end"
								>
									{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<Link
				component="button"
				onClick={handleClickOpen}
				variant="body2"
				sx={{ alignSelf: "baseline" }}
			>
				Esqueceu a senha?
			</Link>
			<ForgotPassword open={open} handleClose={handleClose} />
			<Button
				type="submit"
				fullWidth
				variant="contained"
				onClick={validateInputs}
				sx={{ marginTop: 3 }}
			>
				LOGIN
			</Button>
		</Box>
	);
}

SignInForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
