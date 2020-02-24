import React from 'react';
import logo from './logo.svg';
//import CityTitle from './Components/CityTitle/CityTitle'
import './App.css';
import Main from './Components/Main';
const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";

function App() {

  return(
      <div className="App">
          <div className={'container'}>
              <Main />
          </div>
      </div>
  );
  /**
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  **/
}

export default App;
