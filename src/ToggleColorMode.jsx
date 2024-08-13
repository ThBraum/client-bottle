import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Switch } from "@mui/material";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";

function ToggleColorMode({ mode, toggleColorMode, ...props }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				width: "100%",
				alignItems: "center",
			}}
		>
			<ModeNightRoundedIcon />
			<Switch checked={mode === "dark"} onChange={toggleColorMode} color="default" {...props} />
			<WbSunnyRoundedIcon />
		</Box>
	);
}

ToggleColorMode.propTypes = {
	mode: PropTypes.oneOf(["dark", "light"]).isRequired,
	toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
