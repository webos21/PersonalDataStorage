import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import RegularRecord from './RegularRecord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><RegularRecord /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
