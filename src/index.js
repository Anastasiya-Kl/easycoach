import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { Route, Routes, BrowserRouter } from "react-router-dom";


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />        
      </Routes>
    </BrowserRouter>   
  </StrictMode>
);