import EmployeeService from "@ems/services/EmployeeService";
import useHttpClientHook from "./useHttpClientHook";
import { useState } from "react";
import EmployeeCommand from "@ems/services/commands/EmployeeCommand";

const useEmployeeServiceHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const httpClient = useHttpClientHook();
    const employeeService = new EmployeeService(httpClient);

    const handleGet = async (id: string) => {
        setIsLoading(true);
        const response = await employeeService.FindAsync(id);
        setIsLoading(false);
        return response;
    };

    const handleCreate = async (data: EmployeeCommand) => {
        setIsLoading(true);
        const response = await employeeService.InsertAsync(data);
        setIsLoading(false);
        return response;
    };

    const handleUpdate = async (id: string, data: EmployeeCommand) => {
        setIsLoading(true);
        const response = await employeeService.PatchAsync(id, data);
        setIsLoading(false);
        return response;

    }

    const handleRemove = async (id: string) => {
        setIsLoading(true);
        const response = await employeeService.DeleteAsync(id);
        setIsLoading(false);
        return response;
    };

    const handlePagination = async (params: { limit: string; page: string; [key: string]: string }) => {
        setIsLoading(true);
        const response = await employeeService.ListAsync(params);
        setIsLoading(false);
        return response;
    };

    return {
        isLoading,
        get: handleGet,
        create: handleCreate,
        update: handleUpdate,
        remove: handleRemove,
        list: handlePagination,
    };
}

export default useEmployeeServiceHook;

