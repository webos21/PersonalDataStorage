import { createRoot } from 'react-dom/client';

import CustomScroller from '.';

it('renders the component without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<CustomScroller>Test</CustomScroller>);
    root.unmount();
});
