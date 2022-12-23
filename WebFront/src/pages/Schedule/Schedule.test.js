import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Schedule from './Schedule';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Schedule /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
