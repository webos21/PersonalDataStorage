// library
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

// in-package
import AccountClass from './AccountClass';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
        <MemoryRouter>
            <AccountClass />
        </MemoryRouter>
    );
    root.unmount();
});
