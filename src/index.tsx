import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Theme className="App" preset={presetGpnDefault}>
    <App />
    </Theme>
  </React.StrictMode>
);
