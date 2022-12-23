import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import RealEstateRecord from './RealEstateRecord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><RealEstateRecord /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
