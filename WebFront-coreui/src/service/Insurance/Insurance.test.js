import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Insurance from './Insurance';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Insurance /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
