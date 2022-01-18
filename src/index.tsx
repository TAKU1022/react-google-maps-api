import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { GourmetFormProvider } from './contexts/GourmetForm/GourmetFormProvider';
import { MapLoadingProvider } from './contexts/MapLoading/MapLoadingProvider';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MapLoadingProvider>
      <GourmetFormProvider>
        <App />
      </GourmetFormProvider>
    </MapLoadingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
