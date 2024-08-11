import React from "react";
import SignIn from "./SignIn";
import StickyFooter from "./StickyFooter";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

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
				<SignIn mode={mode} toggleColorMode={handleThemeChange} />

				<StickyFooter />
			</Box>
		</ThemeProvider>
	);
}

export default App;
