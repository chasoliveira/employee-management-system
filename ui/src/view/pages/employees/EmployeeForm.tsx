import EmployeeCommand from "@ems/services/commands/EmployeeCommand";
import Employee from "@ems/services/models/Employee";
import { Alert, AlertColor, Card, CardContent, CircularProgress, Grid, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeFormContent from "./EmployeeFormContent";
import useEmployeeServiceHook from "@ems/hooks/useEmployeeServiceHook";
import { DefaultResponse } from "@ems/services/EmployeeService";

const snackbarState: { open: boolean; severity: AlertColor; message: string } = {
    open: false,
    severity: "success",
    message: "Action performed successfully!",
};

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState(snackbarState);
    const [employee, setEmployee] = useState<Employee>({} as Employee);
    const [hasError, setHasError] = useState(false);

    const { isLoading, get, update, create, remove } = useEmployeeServiceHook();

    useEffect(() => {
        if (id) {
            const fetchEmployee = async () => {
                const data = await get(id);
                if (data instanceof DefaultResponse) return console.error(data.message);
                setEmployee(data);
                console.log("get called:", data)
            };
            fetchEmployee();
        }
    }, [id]);

    const onSubmit = async (data: EmployeeCommand) => {
        let isSuccess = false;
        if (id) {
            const resp = await update(id, data);
            if (resp.status >= 400) {
                setHasError(true);
                setEmployee({ ...data } as unknown as Employee);
                return;
            }
            isSuccess = resp.status < 400;
        } else {
            const resp = await create(data);
            if (resp.status >= 400) {
                setHasError(true);
                setEmployee({ ...data } as unknown as Employee);
                return;
            }
            isSuccess = resp.status < 400;
            //redirect the newly created employee that will be on htpp header location to edit page
            if (isSuccess) {
                if (resp.location) {
                    const id = resp.location.split("/").pop();
                    navigate(`/employees/${id}/edit`);
                }
            }
        }

        setSnackbar((prev) => ({ ...prev, open: true, severity: isSuccess ? "success" : "error" }));
    };
    const onRemove = async () => {
        if (!id) return;
        const resp = await remove(id);
        const isSuccess = resp.status < 400;
        setSnackbar((prev) => ({ ...prev, open: true, severity: isSuccess ? "success" : "error" }));
        if (isSuccess) {
            setTimeout(() => {
                navigate("/employees");
            }, 1000);
        }
    };

    const handleClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Card>
            <CardContent>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                    <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
                <Grid container spacing={2} mt={10} pl={2} pr={2}>
                    <Typography variant="h5" gutterBottom>
                        {id ? 'Edit Employee' : 'New Employee'}
                    </Typography>
                    {isLoading ?
                        (<CircularProgress />) :
                        (<EmployeeFormContent employee={employee} hasError={hasError} onSubmit={onSubmit} onDelete={onRemove} />)
                    }
                </Grid>
            </CardContent>
        </Card>

    );
}

export default EmployeeForm;