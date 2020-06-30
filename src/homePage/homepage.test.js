import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './homePage.js';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><HomePage /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });