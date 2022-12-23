import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Record from './Record';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Record /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
