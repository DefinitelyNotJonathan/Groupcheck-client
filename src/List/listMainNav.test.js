import React from 'react';
import ReactDOM from 'react-dom';
import ListMainNav from './listMainNav.js';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ListMainNav /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });