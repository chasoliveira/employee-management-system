import useEmployeeServiceHook from "@ems/hooks/useEmployeeServiceHook";
import Employee from "@ems/services/models/Employee";
import { Box, Button, Card, CardContent, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useLoginStoreHook } from "@ems/hooks/useLoginStoreHook";
import { Edit, RemoveCircle } from "@mui/icons-material";

type ListParams = {
    search: string;
    limit: string;
    page: string;

};
const InitialListParams: ListParams = {
    search: "",
    limit: "10",
    page: "1",
};
const EmployeeList = () => {
    const { list } = useEmployeeServiceHook();
    const { getLogin } = useLoginStoreHook();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [search, setSearch] = useState<string>("");
    const [params, setParams] = useState<ListParams>(InitialListParams);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await list(params);
            if (data instanceof Error) return console.error(data.message);
            setEmployees(data.items);
        };
        fetchEmployees();
    }, [params]);

    useEffect(() => {
        const login = getLogin();
        console.log("login", login);
        if (login) {
            setIsAdmin(login.role === "Admin");
        } else
            setIsAdmin(false);
    }, []);


    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setParams((prevParams) => ({
            ...prevParams,
            page: (newPage + 1).toString(),
        }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setParams((prevParams) => ({
            ...prevParams,
            limit: event.target.value,
            page: "1",
        }));
    };
    const handleOnSearch = () => {
        setParams((prevParams) => ({
            ...prevParams,
            search: search,
            page: "1",
        }));
    };

    const handdleOnSerachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} mt={10} pl={2} pr={2}>
                    <Typography variant="h5" gutterBottom>
                        Employees
                    </Typography>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid container item xs={9} spacing={2}>
                                {isAdmin && <>
                                    <TextField
                                        label="Name or Job Title"
                                        fullWidth
                                        value={search}
                                        onChange={handdleOnSerachChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleOnSearch}>
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </>}
                            </Grid>
                            <Grid item xs={3} >
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained" color="primary" to="/employees/new" component={Link}>
                                        New
                                    </Button>
                                </Box>
                            </Grid>

                        </Grid>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Job Title</TableCell>
                                        <TableCell>Date Of Joining</TableCell>
                                        <TableCell>Year of Service</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell>{employee.firstName}</TableCell>
                                            <TableCell>{employee.lastName}</TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.jobTitle}</TableCell>
                                            <TableCell>{employee.dateOfJoining}</TableCell>
                                            <TableCell>{employee.yearsOfService}</TableCell>
                                            <TableCell>
                                                <IconButton color="warning" title="Edit" component={Link} to={`/employees/${employee.id}/edit`}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="error" title="Remove" component={Link} to={`/employees/${employee.id}/remove`}>
                                                    <RemoveCircle />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={employees.length}
                            rowsPerPage={parseInt(params.limit)}
                            page={parseInt(params.page) - 1}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </CardContent >
        </Card >
    );
}

export default EmployeeList;