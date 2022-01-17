import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { GourmetFormProvider } from './contexts/GourmetFormProvider';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <GourmetFormProvider>
      <App />
    </GourmetFormProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
