import React from 'react';
import {
   BrowserRouter as Router,
   Route,
   Routes,
 } from "react-router-dom";
 
import LoginPage from '../../pages/Login/LoginPage';
import RegisterPage from '../../pages/Registration/RegisterPage';
import HomePage from '../../pages/Home/HomePage';

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<HomePage/>}/>
         </Routes>
      </Router>
   );
}

export default App;
