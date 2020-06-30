import React from 'react';
import ReactDOM from 'react-dom';
import ListHomePage from './listHomePage.js';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ListHomePage /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });