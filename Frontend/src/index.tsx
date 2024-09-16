import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/LayoutArea/Layout/Layout';
import interceptorService from './Services/InterceptorService';
import './index.css';

interceptorService.createInterceptors();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
