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
import { UserContext } from './userContext';

function App() {
  const [username, setUsername] = React.useState("")

  return (
    <UserContext.Provider value={{username: username, setUsername: setUsername}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInForm/>}></Route>
          <Route path="/folders" element={<FoldersView username={username} />}></Route>
          <Route path="/folders/:folder" element={<TasksView username={username} />}></Route>
          <Route path="/sign-up" element={<SignUpView />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}



export default App;
