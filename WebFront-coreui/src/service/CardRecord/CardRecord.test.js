import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import CardRecord from './CardRecord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><CardRecord /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
