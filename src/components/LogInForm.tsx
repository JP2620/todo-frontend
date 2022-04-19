import axios from "axios";
import React, { Component } from "react";
import {
  Link,
  Navigate
} from 'react-router-dom'

type LogInProps = {
  auth_user: string,
  handler: any,
}

export default class LogInForm extends Component<LogInProps> {
  constructor(props: LogInProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(this.props.auth_user)
    console.log(this.props.auth_user.length);
    console.log(this.props.auth_user !== "");
  }

  handleChange(event: React.ChangeEvent<HTMLFormElement | HTMLInputElement>) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event: any) {
    const { username, password }: any = this.state;
    event.preventDefault();
    fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      }
    })
    .then((data) => {
      this.props.handler({username: username});
      console.log(this.props.auth_user);
    })
    .catch((error: Error) => {
      console.log(error);
    })
  }

  render() {
    const { username, password }: any = this.state;
    if (this.props.auth_user !== "")
      return <Navigate to="/folders" replace={true} />
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-field">
            <label htmlFor="usernameInput">
              Username
            </label>
            <input
              id="usernameInput"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="passwordInput">
              Password
            </label>
            <input
              id="passwordInput"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </div>
          <p className="login-signup">Don't have an account? <Link to="/sign-up">Sign up</Link></p>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}