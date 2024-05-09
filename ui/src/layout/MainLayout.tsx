import { Outlet, useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { AppBar, Avatar, Box, ButtonBase, CssBaseline, Toolbar } from "@mui/material";

// project imports

// assets
import MainStyled from "./MainStyled";
import { useLoginStoreHook } from "@ems/hooks/useLoginStoreHook";
import { useEffect } from "react";
import { ILoginResponse } from "@ems/services/responses/LoginResponse";
import { Logout } from "@mui/icons-material";

// ==============================|| MAIN LAYOUT ||============================== //


const Header = (login: ILoginResponse) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setLogin } = useLoginStoreHook();
  const handleLogout = () => {
    setLogin(undefined);
    navigate("/pages/login");
  };
  return (<>
    <Box
      sx={{
        width: 228,
        display: "flex",
        [theme.breakpoints.down("md")]: {
          width: "auto",
        },
      }}
    >
      <Box component="span" sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}>
        EMS - {login.unique_name} - [{login.role}]
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ ml: 2, mr: 3, [theme.breakpoints.down("md")]: { mr: 2 }, justifyContent: 'flex-end' }}>
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Avatar onClick={handleLogout} >
            <Logout stroke="1.5" fontSize="small" />
          </Avatar>
        </ButtonBase>
      </Box>
    </Box>

  </>);
};

const MainLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getLogin } = useLoginStoreHook();


  useEffect(() => {
    const login = getLogin();
    if (login == null || login.isExpired()) {
      window.location.href = "/pages/login";
    }
    const tiket = setTimeout(() => {
      if (login == null || login.isExpired()) navigate("/pages/login");
    }, (login!.exp * 1000) - Date.now());

    return () => {
      clearTimeout(tiket);
    }
  }, [getLogin, navigate]);


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: "none",
        }}
      >
        <Toolbar>
          <Header {...getLogin()!} />
        </Toolbar>
      </AppBar>

      <MainStyled theme={theme} >
        <Outlet />
      </MainStyled>
    </Box>
  );
};

export default MainLayout;