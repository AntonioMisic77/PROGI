import React from 'react';
import {
   BrowserRouter as Router,
   Route,
   Routes,
 } from "react-router-dom";
import HomePage from '../../pages/Home/HomePage';
import LoginPage from '../../pages/Login/LoginPage';
import OperationsPage from '../../pages/Operations/OperationsPage';
import RegisterPage from '../../pages/Registration/RegisterPage';
import UserViewPage from '../../pages/UserView/UserViewPage';
import UserContextProvider from '../../store/UserContextProvider';
import MissingReportsPage from '../../pages/MissingReports/MissingReportsPage';
import FileMissingPersonPage from '../../pages/FileMissingPerson/FileMissingPersonPage';

function App() {
   return (
      <UserContextProvider>
         <Router>
            <Routes>
               <Route path="/login" element={<LoginPage/>}/>
               <Route path="/register" element={<RegisterPage/>}/>
               <Route path="/" element={<HomePage/>}/>
               <Route path="/users" element={<UserViewPage/>}/> 
               <Route path="/operations" element={<OperationsPage/>}/>
               <Route path="/missing-reports" element={<MissingReportsPage/>}/>
               <Route path="/missing-person" element={<FileMissingPersonPage />}/>
            </Routes>
         </Router>
      </UserContextProvider>
   );
}

export default App;
