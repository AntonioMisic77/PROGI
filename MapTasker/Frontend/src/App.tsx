import React from 'react';
import logo from './logo.svg';
import './App.css';
import { UserClient } from './Api/Api';

function App() {
  let handleClick = async () => {
    let client = new UserClient("https://localhost:7270");
    let response = await client.getAllUsers();
    console.log(response);
  }
  return (
    <div className="App">
      <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleClick}>Klikni</button>
      </header>
    </div>
  );
}

export default App;
