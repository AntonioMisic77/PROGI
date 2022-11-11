import React from 'react';
import './App.css';
import { UserClient } from '../../Api/Api';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <RegistrationForm />
         </header>
      </div>
   );
}

export default App;
