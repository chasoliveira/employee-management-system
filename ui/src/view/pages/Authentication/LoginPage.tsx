import React from "react";
import AuthLogin from "./auth-forms/AuthLogin";
import { Box, Card, Divider, Grid, Stack, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";


const AuthWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "100vh",
}));

const LoginPage = () => {
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: "100vh" }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "calc(100vh - 68px)" }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      EMS
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSm ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSm ? "h3" : "h2"}
                          >
                            Hi, welcome back!
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSm ? "center" : "inherit"}>
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={Link}
                        to="/pages/register"
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

const AuthCardWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Card sx={{
      border: "1px solid",
      borderColor: theme.palette.primary.light,
      ":hover": {
        boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
      },
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      }
    }}>
      <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </Card>)
};

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography component={Link} to="https://chasoliveira.dev" target="_blank" variant="subtitle2">
      chasoliveira.dev
    </Typography>
    <Typography component={Link} to="https://chasoliveira.dev" target="_blank" variant="subtitle2">
      &copy; chasoliveira.dev
    </Typography>
  </Stack>
);

export default LoginPage;
