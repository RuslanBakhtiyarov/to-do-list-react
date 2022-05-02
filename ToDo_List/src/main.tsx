import React from 'react'
import ReactDOM from 'react-dom/client';
import { App } from './veiws/App';

import './veiws/styles/reset.scss';
import './veiws/styles/common.scss';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
