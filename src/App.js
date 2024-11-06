import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Principal from './pages/Principal';
import UserPerfil from './pages/UserPerfil';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserPerfil />} />
      </Routes>
    </div>
  );
}

export default App;