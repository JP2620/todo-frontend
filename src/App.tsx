import React from 'react';
import './App.css';
import LogInForm from './components/LogInForm';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'
import FoldersView from './components/FoldersView';

function App() {
  const [username, setUsername] = React.useState({username: ""})
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInForm auth_user={username.username} handler={setUsername} />}></Route>
        <Route path="/home" element={<FoldersView username={username.username}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
