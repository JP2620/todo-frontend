import React, { Component, FC, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext, UserContextType } from "../userContext";

type LogInProps = {
  auth_user: string;
  handler: any;
};

const LogInForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userContext: UserContextType | null = useContext(UserContext);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
      .then((data) => {
        userContext!.setUsername(username);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  if (userContext?.username !== "")
    return <Navigate to="/folders" replace={true} />;
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="usernameInput">Username</label>
          <input
            id="usernameInput"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="passwordInput">Password</label>
          <input
            id="passwordInput"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <p className="login-signup">
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LogInForm;
