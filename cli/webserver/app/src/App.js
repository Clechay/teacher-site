import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Editor} from './components/editor'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Editor content="serserser" />
      </header>
    </div>
  );
}

export default App;
