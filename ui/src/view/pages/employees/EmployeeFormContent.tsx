import EmployeeCommand from "@ems/services/commands/EmployeeCommand";
import Employee from "@ems/services/models/Employee";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export type EmployeeFormContentProps = {
    employee: Employee;
    onSubmit: (data: EmployeeCommand) => void;
    onDelete?: () => void;
    hasError: boolean;
}

const EmployeeFormContent = ({ employee, hasError, onSubmit, onDelete }: EmployeeFormContentProps) => {
    const { register, handleSubmit } = useForm<EmployeeCommand>({
        defaultValues: {
            firstName: employee?.firstName,
            lastName: employee?.lastName,
            email: employee?.email,
            jobTitle: employee?.jobTitle,
            dateOfJoining: employee?.dateOfJoining,
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: 'flex-end' }}>
                    <Button type="button" variant="contained" color="secondary" component={Link} to="/employees">
                        Back to List
                    </Button>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                {...register('firstName')}
                                label="First Name"
                                defaultValue={employee?.firstName}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                {...register('lastName')}
                                label="Last Name"
                                defaultValue={employee?.lastName}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                {...register('email')}
                                label="Email"
                                defaultValue={employee?.email}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                {...register('jobTitle')}
                                label="Job Title"
                                defaultValue={employee?.jobTitle}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                {...register('dateOfJoining')}
                                label="Date of Joining"
                                defaultValue={employee?.dateOfJoining}
                                type="date"
                                placeholder=""
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    placeholder: ""
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: 'flex-end' }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Save
                                </Button>
                                {employee?.id && (
                                    <Button onClick={onDelete} variant="contained" color="error">
                                        Delete
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {hasError && <p>There was an error</p>}
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default EmployeeFormContent;