import React from 'react';
import {
   BrowserRouter as Router,
   Route,
   Routes,
 } from "react-router-dom";

import RegisterPage from '../../pages/Registration/RegisterPage';

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<h1>Za Emin homepage</h1>}/>
         </Routes>
      </Router>
   );
}

export default App;
