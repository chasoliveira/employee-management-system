import { renderHook, act } from '@testing-library/react-hooks';
import LoginService from "@ems/services/LoginService";

import { Mock, beforeEach, describe, vi } from 'vitest';
import { useLoginStoreHook } from './useLoginStoreHook';

vi.mock("@ems/services/LoginService");

describe('useLoginStoreHook', () => {
  let setLoginMock: Mock;
  let getLoginMock: Mock;

  beforeEach(() => {
    setLoginMock = vi.fn();
    getLoginMock = vi.fn();

    (LoginService as jest.MockedClass<typeof LoginService>).mockImplementation(() => {
      return {
        LoginKey: 'login',
        setLogin: setLoginMock,
        getLogin: getLoginMock,
      };
    });
  });

  it('should set login', () => {
    const { result } = renderHook(() => useLoginStoreHook());
    const mockValue = 'test-login';

    act(() => {
      result.current.setLogin(mockValue);
    });

    expect(setLoginMock).toHaveBeenCalledWith(mockValue);
  });

  it('should get login', () => {
    const mockResponse = { /* your mock login response */ };
    getLoginMock.mockReturnValue(mockResponse);

    const { result } = renderHook(() => useLoginStoreHook());

    expect(result.current.getLogin()).toEqual(mockResponse);
  });
});