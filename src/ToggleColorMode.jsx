import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

import IconButton from "@mui/material/IconButton";

import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";

function ToggleColorMode({ mode, toggleColorMode, ...props }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				width: "100%",
			}}
		>
			<IconButton
				onClick={toggleColorMode}
				color="primary"
				aria-label="Theme toggle button"
				{...props}
			>
				{mode === "dark" ? (
					<WbSunnyRoundedIcon fontSize="small" />
				) : (
					<ModeNightRoundedIcon fontSize="small" />
				)}
			</IconButton>
		</Box>
	);
}

ToggleColorMode.propTypes = {
	mode: PropTypes.oneOf(["dark", "light"]).isRequired,
	toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
