import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import PasswordBook from './PasswordBook';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<MemoryRouter><PasswordBook /></MemoryRouter>);
  root.unmount();
});
