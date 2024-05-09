import HttpClient from '@ems/services/HttpClient';
import EmployeeService, { PagedResponse } from './EmployeeService';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Employee from './models/Employee';

describe('EmployeeService', () => {
  let httpClient: HttpClient;
  let employeeService: EmployeeService;

  beforeEach(() => {
    httpClient = new HttpClient(); // replace with your actual HttpClient initialization
    employeeService = new EmployeeService(httpClient);
  });

  it('should find an employee by ID', async () => {
    const employeeId = 'test-id';
    const mockEmployee: Employee = { /* your mock employee data */ } as Employee;

    httpClient.GetAsync = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockEmployee),
    });

    const result = await employeeService.FindAsync(employeeId);

    expect(result).toEqual(mockEmployee);
    expect(httpClient.GetAsync).toHaveBeenCalledWith(`/api/v1/employees/${employeeId}`);
  });

  it('should list employees', async () => {
    const params = { limit: '10', page: '1' };
    const mockResponse: PagedResponse<Employee> = {
      items: [
        {
          id: 'test-id',
          firstName: 'first',
          lastName: 'last',
          email: 'email@email.com',
          jobTitle: 'doctor',
          dateOfJoining: '2010-01-01',
          yearsOfService: 14,
        } as Employee,
      ],
      total: 1,
      limit: 10,
      page: 1,
    };

    httpClient.GetAsync = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await employeeService.ListAsync(params);

    expect(result).toEqual(mockResponse);
    expect(httpClient.GetAsync).toHaveBeenCalledWith(`/api/v1/employees/?limit=10&page=1`);
  });
});