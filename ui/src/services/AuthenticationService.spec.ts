import HttpClient from './HttpClient';
import AuthenticationService from './AuthenticationService';
import LoginCommand from './commands/LoginCommand';
import RegisterCommand from './commands/EmployeeCommand';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('AuthenticationService', () => {
    let httpClient: HttpClient;
    let authService: AuthenticationService;

    beforeEach(() => {
        httpClient = new HttpClient(); // replace with your actual HttpClient initialization
        authService = new AuthenticationService(httpClient);
    });

    it('should return null when try to authenticate an user but server returns error', async () => { 
        const mockData: LoginCommand = { /* your mock login data */ } as LoginCommand;

        httpClient.AuthAsync = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
        });

        const result = await authService.authenticateAsync(mockData);

        expect(result).toBeNull();
        expect(httpClient.AuthAsync).toHaveBeenCalledWith(`/api/v1/users/login`, mockData);
    });

    it('should authenticate a user', async () => {
        const mockData: LoginCommand = { /* your mock login data */ } as LoginCommand;
        const mockResponse = { accessToken: 'test-token' };

        httpClient.AuthAsync = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockResponse),
        });

        const result = await authService.authenticateAsync(mockData);

        expect(result).toEqual(mockResponse);
        expect(httpClient.AuthAsync).toHaveBeenCalledWith(`/api/v1/users/login`, mockData);
    });

    it('should register a user', async () => {
        const mockData: RegisterCommand = { /* your mock register data */ } as RegisterCommand;
        const mockResponse = { accessToken: 'test-token' };

        httpClient.PostAsync = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(mockResponse),
        });

        const result = await authService.registerAsync(mockData);

        expect(result).toEqual(mockResponse);
        expect(httpClient.PostAsync).toHaveBeenCalledWith(`/api/v1/users/register`, mockData);
    });
});