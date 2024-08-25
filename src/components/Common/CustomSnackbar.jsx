import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

function CustomSnackbar({
	open,
	message,
	severity = "error",
	onClose,
	vertical = "top",
	horizontal = "right",
	autoHideDuration = 5000,
	TransitionComponent = Slide,
}) {
	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			anchorOrigin={{ vertical, horizontal }}
			TransitionComponent={TransitionComponent}
		>
			<Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default CustomSnackbar;
