import useHttpClientHook from "./useHttpClientHook";
import { useState } from "react";
import AuthenticationService from "@ems/services/AuthenticationService";
import LoginCommand from "@ems/services/commands/LoginCommand";

const useAuthenticationServiceHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const httpClient = useHttpClientHook();
    const authenticationService = new AuthenticationService(httpClient);

    const handleAuthenticate = async (data: LoginCommand) => {
        setIsLoading(true);
        const response = await authenticationService.authenticateAsync(data);
        setIsLoading(false);
        return response;
    };

    return {
        isLoading,
        authenticate: handleAuthenticate,
    };
};

export default useAuthenticationServiceHook;