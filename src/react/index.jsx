import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

const root = createRoot(document.getElementById('three-canvas-new'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
