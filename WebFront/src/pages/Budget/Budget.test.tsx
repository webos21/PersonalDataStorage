import { beforeEach, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ToastProvider } from '@/shared/ui/feedback/Toast';

import Budget from './Budget';
import api from './api';
import accountClassApi from '@/pages/AccountClass/api';
import accountCodeApi from '@/pages/AccountCode/api';

vi.mock('./api', () => ({
    default: {
        useList: vi.fn(),
        useCreate: vi.fn(),
        useUpdate: vi.fn(),
        useDelete: vi.fn()
    }
}));

vi.mock('@/pages/AccountClass/api', () => ({
    default: {
        useList: vi.fn()
    }
}));

vi.mock('@/pages/AccountCode/api', () => ({
    default: {
        useList: vi.fn()
    }
}));

beforeEach(() => {
    (api.useList as any).mockReturnValue({
        data: {
            result: 'OK',
            pagination: { totalCount: 0, totalPages: 1, currentPage: 1 },
            data: []
        },
        isLoading: false
    });
    (api.useCreate as any).mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    (api.useUpdate as any).mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    (api.useDelete as any).mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    (accountClassApi.useList as any).mockReturnValue({
        data: {
            result: 'OK',
            pagination: { totalCount: 0, totalPages: 1, currentPage: 1 },
            data: []
        },
        isLoading: false
    });
    (accountCodeApi.useList as any).mockReturnValue({
        data: {
            result: 'OK',
            pagination: { totalCount: 0, totalPages: 1, currentPage: 1 },
            data: []
        },
        isLoading: false
    });
});

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <ToastProvider>
                <Budget />
            </ToastProvider>
        </MemoryRouter>
    );
});
