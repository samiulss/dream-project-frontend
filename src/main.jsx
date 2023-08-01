import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter
} from 'react-router-dom';
import App from './App';
import StateContext from './context/StateContext';
import './index.scss';
import './responsive.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateContext>
  </React.StrictMode>,
);
