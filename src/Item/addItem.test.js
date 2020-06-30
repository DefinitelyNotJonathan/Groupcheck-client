import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from './addItem.js';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><AddItem /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });