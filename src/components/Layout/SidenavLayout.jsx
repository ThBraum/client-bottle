import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidenav from "components/Common/Sidenav";
import React from "react";
import { Outlet } from "react-router-dom";

const SidenavLayout = ({ mode, toggleColorMode }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<div>
			<Sidenav mode={mode} toggleColorMode={toggleColorMode} />
			<div
				style={{
					flexGrow: 1,
					marginLeft: isMobile ? 0 : `calc(${theme.spacing(8)})`,
				}}
			>
				<Outlet />
			</div>
		</div>
	);
};

export default SidenavLayout;
