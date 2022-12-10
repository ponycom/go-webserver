import logo from './logo.svg';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Layout from './pages/Layout';
import Editor from './pages/Editor/Editor';
import Admin from './pages/Admin/Admin';
import Missing from './pages/Missing/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './pages/Lounge/Lounge';
import RequireAuth from './components/RequireAuth';
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from "react";
import { SiteContext } from "./context/SiteContext";
import "./style/dark.scss";
import Calendar from './pages/Calendar/Calendar';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function App() {

  const { state , dispatch } = useContext(SiteContext);

  return (
    <div className={ state?.colorMode=='dark' ? "app dark" : state?.colorMode=='green' ? "app green" :  state?.colorMode=='pink' ? "app pink" : "app" }>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* protect these routes */}
        <Route element={<RequireAuth />}>
          
            <Route path="/" element={<Home />} />
            <Route path="editor" element={<Editor />} />
            <Route path="admin" element={<Admin />} />
            <Route path="lounge" element={<Lounge />} />
            <Route path="calendar" element={<Calendar />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
