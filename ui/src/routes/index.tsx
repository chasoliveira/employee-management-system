import { RouteObject, useRoutes } from "react-router-dom";

import { MainLayout } from "@ems/layout";

// routes
import AuthenticationRoutes from "./AuthenticationRoutes";
import EmployeeForm from "@ems/view/pages/employees/EmployeeForm";
import EmployeeList from "@ems/view/pages/employees/EmployeeList";

const employeeRoutes: RouteObject[] = [
    {
        path: "employees/:id/edit",
        element: <EmployeeForm />,
    },
    {
        path: "employees/:id/remove",
        element: <EmployeeForm />,
    },
    {
        path: "employees/new",
        element: <EmployeeForm />,
    },
    {
        path: "employees",
        element: <EmployeeList />,
    },
];
const MainRoutes: RouteObject = {
    path: "/",
    element: <MainLayout />,
    children: [
        ...employeeRoutes
    ],
};


export default function EmsRoutes() {
    const routes = useRoutes([MainRoutes, AuthenticationRoutes]);
    return routes;
}