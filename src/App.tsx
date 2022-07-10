import React, { useEffect, useState } from "react";
import "./App.css";
import LogInForm from "./components/LogInForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FoldersView from "./components/FoldersView";
import TasksView from "./components/TasksView";
import SignUpView from "./components/SignUpView";
import { UserContext, UserContextType } from "./userContext";

function App() {
  const [user, setUser] = useState<UserContextType | null>(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/auth", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
    })
      .then((res) => {
        res.json().then((authData) => {
          setUser(authData.passport.user as UserContextType);
        });
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInForm />}></Route>
          <Route path="/folders" element={<FoldersView />}></Route>
          <Route path="/folders/:folder" element={<TasksView />}></Route>
          <Route path="/sign-up" element={<SignUpView />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
