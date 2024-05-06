import React from 'react';
import './App.css';
import Main from './components/Main';
import NavBar from './components/NavBar';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <NavBar />
        <Main />
      </div>
    </UserProvider>
  );
}

export default App;