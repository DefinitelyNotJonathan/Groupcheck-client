import React from 'react';
import ReactDOM from 'react-dom';
import ListMain from './listMain.js';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><ListMain /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  