import React from 'react';
import Home from './pages/Home';
import Login from './pages/Auth/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactUs } from './pages/Auth/contactus'
import Resetpw from './pages/Auth/resetpw'


function App() {


  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element={<Home/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/resetpw" element={<Resetpw/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
