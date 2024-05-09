export interface ILoginResponse {
  access_token: string;
  unique_name: string;
  email: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
  isExpired(): boolean;
}

export default class LoginResponse implements ILoginResponse {
  unique_name: string;
  email: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
  access_token: string;
  constructor(token: string) {
    const parsedJwt = this.parseJwt(token);
    this.access_token = token;
    this.unique_name = parsedJwt.unique_name;
    this.email = parsedJwt.email;
    this.role = parsedJwt.role;
    this.nbf = parsedJwt.nbf;
    this.exp = parsedJwt.exp;
    this.iat = parsedJwt.iat;
  }

  private parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  isExpired() {
    return this.exp < Date.now() / 1000;
  }
}
