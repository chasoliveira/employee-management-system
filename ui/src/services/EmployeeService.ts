
import HttpClient from "./HttpClient";
import EmployeeCommand from "./commands/EmployeeCommand";
import Employee from "./models/Employee";

export type PagedResponse<T> = {
  page: number;
  limit: number;
  total: number;
  items: T[];
};
export class DefaultResponse extends Error {
  constructor(
    public success: boolean,
    public message: string,
    public status: number,
    public location: string | null = null) {
    super(message);
  }
}

export default class EmployeeService {
  protected router: string = "employees";

  protected _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  protected getBaseUri(id: string | undefined = undefined) {
    const routeId = id ? `/${id}` : "";
    return `/api/v1/${this.router}${routeId}`;
  }

  async FindAsync(id: string): Promise<Employee | DefaultResponse> {
    const response = await this._httpClient.GetAsync(this.getBaseUri(id));
    if (response.ok) {
      const data = await response.json();
      return data as Employee;
    }
    return Promise.reject(new DefaultResponse(false, `Error on find by ID: '${id}'`, response.status));
  }
  async ListAsync(params: { limit: string; page: string;[key: string]: string }): Promise<PagedResponse<Employee>> {
    const urlParams = new URLSearchParams(params).toString();
    const uri = `${this.getBaseUri()}/${urlParams.length && "?"}${urlParams}`;
    const response = await this._httpClient.GetAsync(uri);

    if (response.ok) return (await response.json()) as PagedResponse<Employee>;

    return Promise.resolve<PagedResponse<Employee>>({
      page: Number(params.page),
      limit: Number(params.limit),
      total: 0,
      items: [],
    });
  }
  async InsertAsync(item: EmployeeCommand): Promise<DefaultResponse> {
    const response = await this._httpClient.PostAsync(this.getBaseUri(), item);
    return await this.extractResponse(response);
  }

  async PatchAsync(id: string, item: EmployeeCommand): Promise<DefaultResponse> {
    const patch = Object.entries(item)
      .filter((kv) => kv[0] !== "id")
      .map(([key, value]) => {
        return ({
          op: "replace",
          path: key,
          value,
        });
      });
    const response = await this._httpClient.PatchAsync(this.getBaseUri(id), patch);
    return await this.extractResponse(response);
  }
  async DeleteAsync(id: string): Promise<DefaultResponse> {
    const response = await this._httpClient.DeleteAsync(this.getBaseUri(id));
    return await this.extractResponse(response);
  }

  protected async extractResponse(response: Response) {
    let message: string = "";
    if (response.ok && response.status == 200) {
      message = await response.json();
    }
    const locationFromHeader = response.headers.get("location");

    return Promise.resolve(new DefaultResponse(response.ok, message, response.status, locationFromHeader));
  }
}
