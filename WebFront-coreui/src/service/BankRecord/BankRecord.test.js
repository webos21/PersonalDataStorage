import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import BankRecord from './BankRecord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><BankRecord /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
