import React from 'react';
import ReactDOM from 'react-dom';
import LogoutButton from './LogoutButton.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LogoutButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });