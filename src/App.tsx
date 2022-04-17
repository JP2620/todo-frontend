import React from 'react';
import './App.css';
import LogInForm from './components/LogInForm';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Folders from './components/Folders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInForm/>}></Route>
        <Route path="/home" element={<Folders/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
