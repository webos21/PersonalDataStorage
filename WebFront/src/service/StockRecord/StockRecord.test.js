import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import StockRecord from './StockRecord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><StockRecord /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
