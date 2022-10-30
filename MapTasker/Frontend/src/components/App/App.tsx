import React from 'react';
import './App.css';
import { UserClient } from '../../Api/Api';
import Button from '../Button/Button';

function App() {
  let handleClick = async () => {
    let client = new UserClient("https://localhost:7270");
    let response = await client.getAllUsers();
    console.log(response);
  }
  return (
    <div className="App">
      <header className="App-header">
          <Button onClick={handleClick} text="Klikni me"/>
      </header>
    </div>
  );
}

export default App;
