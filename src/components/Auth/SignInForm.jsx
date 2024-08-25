import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Link,
	TextField,
	InputAdornment,
	IconButton,
	Tooltip,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import ForgotPassword from "./ForgotPassword";

function SignInForm({ handleSubmit }) {
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleClickOpen = (e) => {
		e.preventDefault();
		setPasswordError(false);
		setPasswordErrorMessage("");
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const validateInputs = () => {
		let isValid = true;

		if (!password || password.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage("A senha deve ter pelo menos 6 caracteres.");
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage("");
		}

		return isValid;
	};

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		if (validateInputs()) {
			handleSubmit(e);
		}
	};

	useEffect(() => {
		if (emailOrUsername.trim() && password.trim()) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [emailOrUsername, password]);

	return (
		<Box
			component="form"
			onSubmit={handleLoginSubmit}
			noValidate
			sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
		>
			<FormControl>
				<FormLabel
					htmlFor="emailOrUsername"
					sx={{ fontSize: "0.99rem", display: "flex", alignItems: "center" }}
				>
					Email ou username
				</FormLabel>
				<TextField
					id="emailOrUsername"
					name="emailOrUsername"
					placeholder="example@email.com"
					autoFocus
					required
					fullWidth
					variant="outlined"
					value={emailOrUsername}
					onChange={(e) => setEmailOrUsername(e.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton edge="end" aria-label="email or username icon">
									<MailIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</FormControl>
			<FormControl error={passwordError}>
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
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
			<Tooltip
				title={
					isButtonDisabled ? "Preencha o email ou username e a senha para habilitar o login" : ""
				}
				disableHoverListener={!isButtonDisabled}
			>
				<span>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={isButtonDisabled}
						sx={{ marginTop: 3 }}
					>
						LOGIN
					</Button>
				</span>
			</Tooltip>
		</Box>
	);
}

SignInForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
