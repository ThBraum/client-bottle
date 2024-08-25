import React, { useEffect, useState } from "react";
import {
	TextField,
	InputAdornment,
	IconButton,
	Box,
	CircularProgress,
	Button,
	Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchTransactions } from "services/transactionService";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const columns = [
	{ field: "client_name", headerName: "Cliente", flex: 2, minWidth: 150 },
	{
		field: "client_phone",
		headerName: "Telefone",
		flex: 1,
		minWidth: 120,
		valueGetter: (params) => params.row.client_phone || "",
	},
	{ field: "transaction_date", headerName: "Data", flex: 1, minWidth: 120 },
	{ field: "recorded_by", headerName: "Responsável", flex: 2, minWidth: 150 },
	{
		field: "transaction_data",
		headerName: "Garrafa(s)",
		flex: 3,
		minWidth: 200,
		renderCell: (params) => (
			<div>
				{params.value.map((item, index) => (
					<div key={index}>
						{item.brand} - {item.quantity}
					</div>
				))}
			</div>
		),
	},
];

const TransactionTable = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 20,
	});
	const [term, setTerm] = useState("");
	const [dateFilter, setDateFilter] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [showFilters, setShowFilters] = useState(false);

	const token = localStorage.getItem("access_token");

	const isMobile = useMediaQuery("(max-width:600px)");

	useEffect(() => {
		const loadTransactions = async () => {
			setLoading(true);
			try {
				const formattedDate = dateFilter ? dateFilter.toISOString().split("T")[0] : "";
				const data = await fetchTransactions(
					paginationModel.page + 1,
					paginationModel.pageSize,
					term,
					formattedDate,
					token
				);
				setTransactions(data.items);
				setTotalItems(data.total);
			} catch (error) {
				console.error("Erro ao carregar transações:", error);
			} finally {
				setLoading(false);
			}
		};

		loadTransactions();
	}, [paginationModel, term, dateFilter, token]);

	const handleSearchChange = (event) => {
		setTerm(event.target.value);
		setPaginationModel({ ...paginationModel, page: 0 });
	};

	const handleDateChange = (newDate) => {
		setDateFilter(newDate);
		setPaginationModel({ ...paginationModel, page: 0 });
	};

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<Box
			sx={{
				py: 1,
				px: 1,
				height: "calc(100vh - 64px)",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{isMobile ? (
				<>
					<Button
						variant="contained"
						sx={{ width: "100%", marginBottom: 1 }}
						onClick={() => setShowFilters(!showFilters)}
						endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					>
						Visualizar filtro
					</Button>
					<Collapse in={showFilters}>
						<Box sx={{ display: "flex", mb: 2, flexDirection: "column" }}>
							<TextField
								variant="outlined"
								placeholder="Pesquisa"
								value={term}
								onChange={handleSearchChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<IconButton>
												<SearchIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
								sx={{ mb: 0.5 }}
							/>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									value={dateFilter}
									onChange={handleDateChange}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											fullWidth
											placeholder="dd/mm/aaaa"
											InputProps={{
												...params.InputProps,
												startAdornment: (
													<InputAdornment position="start">
														<CalendarTodayIcon
															sx={{ fontSize: "1.35rem", marginLeft: "0.6rem" }}
														/>
													</InputAdornment>
												),
												sx: {
													paddingLeft: "13px",
													"& input": {
														paddingLeft: 1.05,
													},
												},
											}}
										/>
									)}
								/>
							</LocalizationProvider>
						</Box>
					</Collapse>
				</>
			) : (
				<Box sx={{ display: "flex", mb: 2, justifyContent: "space-between" }}>
					<TextField
						variant="outlined"
						placeholder="Pesquisa"
						value={term}
						onChange={handleSearchChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{ flex: 8, mr: 1 }}
					/>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							value={dateFilter}
							onChange={handleDateChange}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="outlined"
									sx={{ flex: 4 }}
									InputProps={{
										...params.InputProps,
										sx: {},
									}}
								/>
							)}
						/>
					</LocalizationProvider>
				</Box>
			)}
			<Box sx={{ flexGrow: 1, overflow: "auto" }}>
				<DataGrid
					rows={transactions.map((transaction) => ({
						...transaction,
						id: transaction.id_client_bottle_transaction,
					}))}
					columns={columns}
					paginationModel={paginationModel}
					onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
					pageSizeOptions={[10, 20, 50]}
					pagination
					paginationMode="server"
					rowCount={totalItems}
					autoHeight={false}
					disableRowSelectionOnClick
					getRowHeight={() => "auto"}
					localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
					sx={{
						minWidth: "600px",
					}}
				/>
			</Box>
		</Box>
	);
};

export default TransactionTable;
