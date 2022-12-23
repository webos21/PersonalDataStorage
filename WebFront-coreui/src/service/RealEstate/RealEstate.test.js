import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import RealEstate from './RealEstate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><RealEstate /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
