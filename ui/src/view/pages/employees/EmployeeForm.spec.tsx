import { render, screen } from '@testing-library/react';
import EmployeeForm from './EmployeeForm';
import useEmployeeServiceHook from '@ems/hooks/useEmployeeServiceHook';
import { BrowserRouter as Router } from 'react-router-dom';
import { Mock, vi } from 'vitest';

vi.mock('@ems/hooks/useEmployeeServiceHook');

describe('EmployeeForm', () => {
  it('should display loading state', () => {
    (useEmployeeServiceHook as Mock).mockReturnValue({
      isLoading: true,
    });

        render(
      <Router>
        <EmployeeForm />
      </Router>
    );

    const loadingElement = screen.getByRole('progressbar');
    expect(loadingElement).toBeDefined();
  });

  it('should display form content when not loading', () => {
    const mockEmployee = { };
    const mockHasError = false;
    const mockOnSubmit = vi.fn();
    const mockOnRemove = vi.fn();

    (useEmployeeServiceHook as Mock).mockReturnValue({
      isLoading: false,
      employee: mockEmployee,
      hasError: mockHasError,
      onSubmit: mockOnSubmit,
      onDelete: mockOnRemove,
    });

    render(
      <Router>
        <EmployeeForm />
      </Router>
    );

    const formContentElement = screen.getAllByText('Back to List');
    expect(formContentElement).toBeDefined();
  });
});