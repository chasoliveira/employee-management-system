import LoginResponse, { ILoginResponse } from "./responses/LoginResponse";

class LoginService {
  LoginKey: string = "EmsJwToken";
  setLogin = (value?: string) => {
    if (value) {
      localStorage.setItem(this.LoginKey, value);
    } else {
      localStorage.removeItem(this.LoginKey);
    }
  };
  getLogin = (): ILoginResponse | null => {
    const token = localStorage.getItem(this.LoginKey);
    if (!token) return null;

    return new LoginResponse(token);
  };
}

export default LoginService;