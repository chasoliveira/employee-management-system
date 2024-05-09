import HttpClient from "@ems/services/HttpClient";

const useHttpClientHook = () => {

    const httpClient = new HttpClient();

    return httpClient;
};

export default useHttpClientHook;