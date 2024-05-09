
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import * as Yup from "yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import LoginCommand from "@ems/services/commands/LoginCommand";
import { yupResolver } from "@hookform/resolvers/yup";

import { Link, useNavigate } from "react-router-dom";
import { useLoginStoreHook } from "@ems/hooks/useLoginStoreHook";
import useAuthenticationServiceHook from "@ems/hooks/useAuthenticationServiceHook";

const defaultValues: LoginCommand = {
  userName: "",
  password: "",
};

const snackbarState: { open: boolean; severity: AlertColor; message: string } = {
  open: false,
  severity: "success",
  message: "Login success!",
};

const AuthLogin = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState(snackbarState);
  const { setLogin } = useLoginStoreHook();
  const [showPassword, setShowPassword] = useState(false);
  const [canRedirect, setCanRedirect] = useState(false);

  const { authenticate } = useAuthenticationServiceHook();

  const resolver = yupResolver<LoginCommand>(
    Yup.object().shape({
      userName: Yup.string().max(255).required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    })
  );
  const hookForm = useForm<LoginCommand>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: defaultValues,
    resolver,
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = hookForm;

  const onSubmit: SubmitHandler<LoginCommand> = async (data) => {
    const response = await authenticate(data);
    if (response != null) setLogin(response.accessToken);

    const isSuccess = !!response;
    setCanRedirect(isSuccess);

    const message = isSuccess ? "Login success! You will be redirect now!" : `User name or Password invalid!`;
    setSnackbar({ open: true, severity: isSuccess ? "success" : "error", message });
    if (isSuccess) {
      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function handleOnMouseDown(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
  }
  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
    console.log("Redirecting from handleClose");
    if (canRedirect) navigate("/");
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with User name</Typography>
          </Box>
        </Grid>
      </Grid>

      <FormProvider {...hookForm}>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          onReset={() => reset(defaultValues)}
        >
          <Grid container direction="column" justifyContent="center" spacing={2}>
            <TextField
              {...hookForm.register("userName")}
              label="User name"
              variant="outlined"
              disabled={canRedirect || isSubmitting}
              sx={{ mb: 2 }}
            />
            <TextField
              {...hookForm.register("password")}
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              disabled={canRedirect || isSubmitting}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      size="large"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleOnMouseDown}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <Typography
                component={Link}
                to={"/"}
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
            </Stack>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              disableElevation
              disabled={isSubmitting || !isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </>
  );
};

export default AuthLogin;
