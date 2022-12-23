import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import InsuranceRecord from './InsuranceRecord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><InsuranceRecord /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
