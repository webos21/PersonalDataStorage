import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Stock from './Stock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Stock /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
