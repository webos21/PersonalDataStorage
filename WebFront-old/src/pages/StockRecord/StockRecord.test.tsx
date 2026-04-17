import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import StockRecord from './StockRecord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
root.render(<MemoryRouter><StockRecord /></MemoryRouter>);
  root.unmount();
});
