import { beforeEach, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ToastProvider } from '@/shared/ui/feedback/Toast';

import CardRecord from './CardRecord';
import api from './api';

vi.mock('./api', () => ({
    default: {
        useList: vi.fn(),
        useCreate: vi.fn(),
        useUpdate: vi.fn(),
        useDelete: vi.fn()
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
});

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <ToastProvider>
                <CardRecord />
            </ToastProvider>
        </MemoryRouter>
    );
});
