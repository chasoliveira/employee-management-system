import { vi } from 'vitest';
import LoginService from './LoginService';
import LoginResponse from './responses/LoginResponse';

describe('LoginService', () => {
    const loginService = new LoginService();
    const loginKey = loginService.LoginKey;
    vi.mock('localStorage');

    afterEach(() => {
        localStorage.clear();
    });

    it('should set login', () => {
        const mockValue = 'test-login';
        loginService.setLogin(mockValue);

        expect(localStorage.getItem(loginKey)).toEqual(mockValue);
    });

    it('should remove login when value is null', () => {
        const mockValue = 'test-login';
        loginService.setLogin(mockValue);
        loginService.setLogin(undefined);

        expect(localStorage.getItem(loginKey)).toBeNull();
    });

    it('should get login', () => {
        const mockValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkMDljYTg1LWZjOWUtNDU0Ny05NjZkLTcyYTk4ZDM1Y2NiMiIsInVuaXF1ZV9uYW1lIjoiY2hhc28iLCJyb2xlIjoiVXNlciIsImF1ZCI6ImVtcy1hdWRpZW5jZSIsImlzcyI6ImVtcy1pc3N1ZXIiLCJuYmYiOjE3MTUyMjM2OTgsImV4cCI6MTcxNTIyNTQ5OCwiaWF0IjoxNzE1MjIzNjk4fQ.xkTfHQz2t5k8K4QxGEbGdHaK4YrJy47oYlYiI4DbXLs';
        localStorage.setItem(loginKey, mockValue);

        const result = loginService.getLogin();

        expect(result).toBeInstanceOf(LoginResponse);
        expect(result?.access_token).toEqual(mockValue);
        expect(result?.unique_name).toEqual('chaso');
        expect(result?.role).toEqual('User');
        expect(result?.nbf).toEqual(1715223698);
        expect(result?.exp).toEqual(1715225498);
        expect(result?.iat).toEqual(1715223698);

    });

    it('should return null when there is no login', () => {
        const result = loginService.getLogin();

        expect(result).toBeNull();
    });
});