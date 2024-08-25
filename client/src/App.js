
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  
import HomePage from './pages/HomePage';  

import AdminDashboard from './component/admin-dashboard/Admin';
import LoginPage from './component/login/LoginPage';
import RegisterPage from './component/register/RegisterPage';


function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

