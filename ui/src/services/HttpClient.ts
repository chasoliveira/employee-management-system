import LoginService from "./LoginService";

import { ILoginResponse } from "./responses/LoginResponse";


class HttpClient {

  getToken: () => ILoginResponse | null;
  constructor() {
    const loginService = new LoginService();
    this.getToken = loginService.getLogin;
  }
  GetAsync = (url: RequestInfo | URL) => this.doFetch("GET", url);

  PostAsync = <T>(url: RequestInfo | URL, body: T) => this.doFetch("POST", url, { body: JSON.stringify(body) });
  AuthAsync = <T>(url: RequestInfo | URL, body: T) => {
    this.doFetch("POST", url, { body: JSON.stringify(body) });
    return fetch(url, {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };
  PutAsync = (url: RequestInfo | URL, body: unknown) => this.doFetch("PUT", url, { body: JSON.stringify(body) });

  PatchAsync = (url: RequestInfo | URL, body: unknown) => this.doFetch("PATCH", url, { body: JSON.stringify(body) });

  DeleteAsync = (url: RequestInfo | URL) => this.doFetch("DELETE", url);

  private doFetch = (method: string, url: RequestInfo | URL, options?: RequestInit) => {
    if (!this.getToken()) return Promise.reject(new Error("Not logged"));

    const token = this.getToken();
    const authorization = { Authorization: `Bearer ${token?.access_token}` };

    return fetch(url, {
      ...options,
      method,
      headers: { ...options?.headers, ...authorization, "Content-Type": "application/json" },
    });
  };
}
export default HttpClient;
