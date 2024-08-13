import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Stack, Box, Avatar, Typography, Card } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import SignInForm from "../../components/Auth/SignInForm";
import StickyFooter from "../../components/Layout/Footer";
import MaterialUISwitch from "../../components/Common/MaterialUISwitch";
import getSignInTheme from "../../getSignInTheme";
import { loginSuccess } from "../../reduxStore/slices/authSlice";
import { login, fetchCurrentUser } from "../../services/authService";

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

const StyledCard = styled(Card)(({ theme }) => ({
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

function SignIn({ mode, toggleColorMode }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const SignInTheme = createTheme(getSignInTheme(mode));

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		try {
			const authData = await login(data.get("email"), data.get("password"));
			dispatch(loginSuccess({ token: authData.access_token, user: authData.user }));
			localStorage.setItem("access_token", authData.access_token);

			const currentUser = await fetchCurrentUser();
			console.log("Usuário logado:", currentUser);

			console.log(`Role: ${currentUser.role}`);

			navigate("/user-info");
		} catch (error) {
			console.error("Falha na autenticação:", error);
		}
	};

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
					<StyledCard>
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
						<SignInForm handleSubmit={handleSubmit} />
					</StyledCard>
				</Stack>
				<StickyFooter />
			</SignInContainer>
		</ThemeProvider>
	);
}

export default SignIn;
