import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
	AppBar as MuiAppBar,
	Box,
	Toolbar,
	IconButton,
	Drawer as MuiDrawer,
	List,
	CssBaseline,
	Typography,
	Divider,
	Link,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { logout } from "reduxStore/slices/authSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import GitHubIcon from "@mui/icons-material/GitHub";
import MaterialUISwitch from "components/Common/MaterialUISwitch";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, isMobile }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(isMobile && {
		backgroundColor: theme.palette.mode === "dark" ? "black" : theme.palette.primary.main,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
		boxSizing: "border-box",
		...(open && {
			...openedMixin(theme),
			"& .MuiDrawer-paper": openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			"& .MuiDrawer-paper": closedMixin(theme),
		}),
	})
);

export default function Sidenav({ mode, toggleColorMode }) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	const handleIconClick = (path) => {
		if (path === "/logout") {
			dispatch(logout());
		}
		if (!open && !isMobile) {
			setOpen(true);
		}
		navigate(path);
	};

	const drawerContent = (
		<Box>
			<DrawerHeader>
				<Link
					href="https://github.com/ThBraum"
					target="_blank"
					rel="noopener noreferrer"
					underline="none"
					color="inherit"
					sx={{ display: "flex", alignItems: "center", marginRight: "65px" }}
				>
					<GitHubIcon sx={{ minWidth: 0, justifyContent: "center", marginRight: 1 }} />
					<Typography noWrap sx={{ fontSize: 18 }}>
						ThBraum
					</Typography>
				</Link>

				<IconButton onClick={handleDrawerToggle}>
					{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{[
					{ text: "Transações - Garrafa", icon: <PaidIcon />, path: "/transactions" },
					{ text: "Marcas - Garrafa", icon: <SportsBarIcon /> },
					{ text: "Clientes", icon: <GroupsIcon /> },
				].map((item) => (
					<ListItem key={item.text} disablePadding sx={{ display: "block" }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
							onClick={() => handleIconClick(item.path)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{[
					{ text: "Adicionar usuário", icon: <GroupAddIcon /> },
					{ text: "Configurações", icon: <SettingsIcon /> },
				].map((item) => (
					<ListItem key={item.text} disablePadding sx={{ display: "block" }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
							onClick={() => handleIconClick(item.path)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem disablePadding sx={{ display: "block" }}>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
						onClick={() => handleIconClick("/logout")}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	const mobileDrawer = (
		<MuiDrawer
			variant="temporary"
			open={open}
			onClose={handleDrawerToggle}
			ModalProps={{
				keepMounted: true,
			}}
			sx={{
				display: { xs: "block", md: "none" },
				"& .MuiDrawer-paper": {
					boxSizing: "border-box",
					width: drawerWidth,
					...(theme.palette.mode === "dark" && {
						backgroundColor: "black",
					}),
				},
			}}
		>
			{drawerContent}
		</MuiDrawer>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open} isMobile={isMobile}>
				<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerToggle}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<MaterialUISwitch
						checked={mode === "dark"}
						onChange={toggleColorMode}
						sx={{ marginLeft: "auto" }}
					/>
				</Toolbar>
			</AppBar>

			{isMobile ? (
				mobileDrawer
			) : (
				<Drawer variant="permanent" open={open}>
					{drawerContent}
				</Drawer>
			)}

			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<DrawerHeader />
			</Box>
		</Box>
	);
}
