import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Diary from './Diary';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Diary /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
