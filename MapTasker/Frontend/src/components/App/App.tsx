import React from 'react';
import {
   BrowserRouter as Router,
   Route,
   Routes,
 } from "react-router-dom";
import HomePage from '../../pages/Home/HomePage';
 
import LoginPage from '../../pages/Login/LoginPage';
import RegisterPage from '../../pages/Registration/RegisterPage';
import UserViewPage from '../../pages/UserView/UserViewPage';

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/users" element={<UserViewPage/>}/> 
         </Routes>
      </Router>
   );
}

export default App;
