import { render, screen } from '@testing-library/react';
import EmployeeList from './EmployeeList';
import { Mock, vi } from 'vitest';
import useEmployeeServiceHook from '@ems/hooks/useEmployeeServiceHook';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react';

vi.mock('@ems/hooks/useEmployeeServiceHook');

describe('EmployeeList', () => {
    // Mocking the useLoginStoreHook that is used in the EmployeeList component
    vi.mock('@ems/hooks/useLoginStoreHook', () => ({
        useLoginStoreHook: () => ({
            getLogin: vi.fn().mockReturnValue({
                role: 'Admin',
            }),
        }),
    }));

    it('should render TextField with label "Name or Job Title" when isAdmin is true', () => {
        (useEmployeeServiceHook as Mock).mockReturnValue({
            isLoading: false,
            list: vi.fn().mockResolvedValue(([])),
        });

        act(() => {
            render(
                <Router>
                    <EmployeeList />
                </Router>
            );
        });

        const textFieldElement = screen.getByLabelText('Name or Job Title');
        expect(textFieldElement).toBeDefined();
    });
});