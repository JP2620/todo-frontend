import React, { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import LogInForm from "./components/LogInForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoldersView from "./components/FoldersView";
import TasksView from "./components/TasksView";
import SignUpView from "./components/SignUpView";
import { User, UserContext } from "./userContext";

function App() {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    fetch("http://localhost:5001/api/auth", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((authData) => {
            setUser(authData.passport.user as User);
          });
        }
      })
      .catch(() => setUser({} as User));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/folders" element={<FoldersView />}></Route>
          <Route path="/folder/:folder" element={<TasksView />}></Route>
          <Route path="/" element={<LogInForm />}></Route>
          <Route path="/sign-up" element={<SignUpView />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
