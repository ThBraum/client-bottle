import React, { useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import AppRoutes from "routes/AppRoutes";
import Footer from "components/Layout/Footer";
import { useDispatch } from "react-redux";
import { loadCurrentUser } from "reduxStore/slices/authSlice";

function App() {
	const dispatch = useDispatch();
	const [mode, setMode] = React.useState("dark");

	const handleThemeChange = (event) => {
		setMode(event.target.checked ? "dark" : "light");
	};

	useEffect(() => {
		dispatch(loadCurrentUser()); // Carrega o estado de autenticação ao iniciar a aplicação
	}, [dispatch]);

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
				<AppRoutes mode={mode} toggleColorMode={handleThemeChange} />
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
