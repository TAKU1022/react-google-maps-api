import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { MapLoadingProvider } from './contexts/MapLoading/MapLoadingProvider';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MapLoadingProvider>
      <App />
    </MapLoadingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
