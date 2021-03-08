import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AddressBook from './AddressBook';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AddressBook /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
