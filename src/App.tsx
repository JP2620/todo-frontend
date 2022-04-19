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
import TasksView from './components/TasksView';
import SignUpView from './components/SignUpView';

function App() {
  const [username, setUsername] = React.useState({username: ""})
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInForm auth_user={username.username} handler={setUsername} />}></Route>
        <Route path="/folders" element={<FoldersView username={username.username}/>}></Route>
        <Route path="/folders/:folder" element={<TasksView username={username.username}/>}></Route>
        <Route path="/sign-up" element={<SignUpView/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
