import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import the Navigate component
import Footer from "./components/Layout/Footer";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import SignIn from "./pages/auth/SignIn";
import PrivateRoutes from "./routes/PrivateRoutes";
import UserInfo from "./pages/auth/UserInfo";

function App() {
	const [mode, setMode] = React.useState("dark");

	const handleThemeChange = (event) => {
		setMode(event.target.checked ? "dark" : "light");
	};

	const theme = createTheme({
		palette: {
			mode,
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
					backgroundColor: theme.palette.background.default,
				}}
			>
				<Routes>
					{/* Rota de login */}
					<Route
						path="/login"
						element={<SignIn mode={mode} toggleColorMode={handleThemeChange} />}
					/>

					{/* Rotas protegidas */}
					<Route element={<PrivateRoutes />}>
						<Route path="/" element={<Navigate to="/login" />} />
						<Route path="/user-info" element={<UserInfo />} />
					</Route>

					{/* Redirecionamento de rotas desconhecidas para login */}
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
