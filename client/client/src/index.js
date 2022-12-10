import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// import { AuthProvider } from './context/AuthProvider';
import { SiteContextProvider } from "./context/SiteContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <SiteContextProvider>
      <BrowserRouter>
        
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
        
      </BrowserRouter>
      </SiteContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);