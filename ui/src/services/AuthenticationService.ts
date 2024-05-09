import HttpClient from "./HttpClient";
import LoginCommand from "./commands/LoginCommand";
import RegisterCommand from "./commands/EmployeeCommand";

export default class AuthenticationService {
  protected router: string = "users";
  protected _httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  async authenticateAsync(data: LoginCommand): Promise<{ accessToken: string } | null> {
    const uri = `/api/v1/${this.router}/login`;
    const response = await this._httpClient.AuthAsync(uri, data);
    if (response.ok && response.status == 200) {
      return await response.json();
    }
    return null;
  }

  async registerAsync(data: RegisterCommand): Promise<{ accessToken: string } | null> {
    const uri = `/api/v1/${this.router}/register`;
    const response = await this._httpClient.PostAsync(uri, data);
    if (response.ok && response.status == 200) {
      return await response.json();
    }
    return null;
  }
}
