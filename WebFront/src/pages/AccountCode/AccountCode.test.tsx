// library
import { vi } from 'vitest';
import { createRoot } from 'react-dom/client';

// in-project
import { ToastProvider } from '@/shared/ui/feedback/Toast';

// in-package
import AccountCode from './AccountCode';

vi.mock('./api', () => ({
    default: {
        useList: () => ({
            data: {
                result: 'OK',
                pagination: { totalCount: 0, totalPages: 1, currentPage: 1 },
                data: []
            },
            isLoading: false
        }),
        useCreate: () => ({ mutateAsync: vi.fn() }),
        useUpdate: () => ({ mutateAsync: vi.fn() }),
        useDelete: () => ({ mutateAsync: vi.fn() })
    }
}));

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
        <ToastProvider>
            <AccountCode />
        </ToastProvider>
    );
    root.unmount();
});
