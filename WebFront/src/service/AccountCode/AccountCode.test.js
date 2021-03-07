import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AccountCode from './AccountCode';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AccountCode /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
