import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SectionContextProvider } from './context/SectionContext.jsx';
import { UserContextProvider } from './context/UserContext.jsx';
import { DBContextProvider } from './context/DBContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <DBContextProvider>
    <SectionContextProvider>
      <App />
    </SectionContextProvider>
    </DBContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
