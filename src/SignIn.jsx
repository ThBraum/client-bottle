import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailIcon from "@mui/icons-material/Mail";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import getSignInTheme from "./getSignInTheme";
import MaterialUISwitch from "./MaterialUISwitch";

const Card = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	gap: theme.spacing(4),
	width: "100%",
	padding: theme.spacing(2),
	[theme.breakpoints.up("sm")]: {
		padding: theme.spacing(4),
		width: "450px",
	},
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
	...theme.applyStyles("dark", {
		boxShadow:
			"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px",
	}),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
	height: "100vh",
	justifyContent: "space-between",
	paddingBottom: theme.spacing(12),
	backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
	backgroundRepeat: "no-repeat",
	[theme.breakpoints.up("sm")]: {
		paddingBottom: 0,
		height: "100dvh",
	},
	...theme.applyStyles("dark", {
		backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.3), hsl(220, 30%, 5%))",
	}),
}));

export default function SignIn({ mode, toggleColorMode }) {
	const [emailError, setEmailError] = React.useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	const validateInputs = () => {
		const email = document.getElementById("email");
		const password = document.getElementById("password");

		let isValid = true;

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true);
			setEmailErrorMessage("Please enter a valid email address.");
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage("");
		}

		if (!password.value || password.value.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage("Password must be at least 6 characters long.");
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

	// Define o tema com base no modo atual
	const SignInTheme = createTheme(getSignInTheme(mode));

	return (
		<ThemeProvider theme={SignInTheme}>
			<SignInContainer direction="column" justifyContent="space-between">
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
						p: 2,
					}}
				>
					<MaterialUISwitch checked={mode === "dark"} onChange={toggleColorMode} />
				</Box>
				<Stack
					sx={{
						justifyContent: "center",
						height: { xs: "100%", sm: "100dvh" },
						p: 2,
					}}
				>
					<Card>
						<Box
							sx={{
								marginTop: 2,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5" marginTop={3}>
								Entrar
							</Typography>
						</Box>
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
									slotProps={{
										input: {
											endAdornment: (
												<InputAdornment position="end">
													<IconButton edge="end" aria-label="email icon">
														<MailIcon />
													</IconButton>
												</InputAdornment>
											),
										},
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
									autoFocus
									required
									fullWidth
									variant="outlined"
									color={passwordError ? "error" : "primary"}
									slotProps={{
										input: {
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
										},
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
					</Card>
				</Stack>
			</SignInContainer>
		</ThemeProvider>
	);
}
