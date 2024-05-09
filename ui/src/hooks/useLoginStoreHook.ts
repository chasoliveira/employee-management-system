import LoginService from "@ems/services/LoginService";
import { ILoginResponse } from "@ems/services/responses/LoginResponse";

export const useLoginStoreHook = (): {
  setLogin: (value?: string) => void;
  getLogin: () => ILoginResponse | null;
} => {
  const service = new LoginService();
  return service;
};
