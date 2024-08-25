import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tooltip from "@mui/material/Tooltip";
import validator from "validator";
import { recoverPassword } from "../../services/authService";
import CustomSnackbar from "components/Common/CustomSnackbar";

function ForgotPassword({ open, handleClose }) {
	const [email, setEmail] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	useEffect(() => {
		if (email && validator.isEmail(email)) {
			setIsEmailValid(true);
			setIsButtonDisabled(false);
		} else {
			setIsEmailValid(false);
			setIsButtonDisabled(true);
		}
	}, [email]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await recoverPassword(email);
			setSnackbarMessage(response.message || "E-mail enviado com sucesso!");
			setSnackbarSeverity("success");
			setSnackbarOpen(true);
			handleClose();
		} catch (error) {
			const errorMessage =
				error.response?.data?.detail || "Erro ao enviar solicitação. Tente novamente.";
			setSnackbarMessage(errorMessage);
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
		}
	};

	const handleTooltipOpen = () => {
		if (isButtonDisabled) {
			setTooltipOpen(true);
		}
	};

	const handleTooltipClose = () => {
		setTooltipOpen(false);
	};

	useEffect(() => {
		if (open) {
			setEmail("");
			setSnackbarOpen(false);
		}
	}, [open]);

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: handleSubmit,
				}}
			>
				<DialogTitle>Redefinir senha</DialogTitle>
				<DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
					<DialogContentText>
						Insira o endereço de e-mail da sua conta e enviaremos um link para redefinir sua senha.
					</DialogContentText>
					<OutlinedInput
						autoFocus
						required
						margin="dense"
						id="email"
						name="email"
						label="Endereço de email"
						placeholder="Endereço de email"
						type="email"
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={!isEmailValid && email.length > 0}
					/>
				</DialogContent>
				<DialogActions sx={{ pb: 3, px: 3 }}>
					<Button onClick={handleClose}>Cancelar</Button>
					<Tooltip
						title={isButtonDisabled ? "Por favor, insira um e-mail válido" : ""}
						open={tooltipOpen}
						onOpen={handleTooltipOpen}
						onClose={handleTooltipClose}
					>
						<span>
							<Button variant="contained" type="submit" disabled={isButtonDisabled}>
								Continuar
							</Button>
						</span>
					</Tooltip>
				</DialogActions>
			</Dialog>
			<CustomSnackbar
				open={snackbarOpen}
				message={snackbarMessage}
				severity={snackbarSeverity}
				onClose={handleSnackbarClose}
				autoHideDuration={3000}
			/>
		</>
	);
}

ForgotPassword.propTypes = {
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
