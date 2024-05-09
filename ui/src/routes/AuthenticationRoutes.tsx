import { lazy } from "react";

// project imports
import MinimalLayout from "@ems/layout/MinimalLayout";
import { RouteObject } from "react-router-dom";

// login option 3 routing
const AuthLogin = lazy(() => import("@ems/view/pages/Authentication/LoginPage"));
const AuthRegister = lazy(() => import("@ems/view/pages/Authentication/RegisterPage"));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes: RouteObject = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/pages/login",
      element: <AuthLogin />,
    },
    {
      path: "/pages/register",
      element: <AuthRegister />,
    },
  ],
};

export default AuthenticationRoutes;
