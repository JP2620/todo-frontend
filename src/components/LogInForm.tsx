import axios from "axios";
import React, { Component } from "react";
import {
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
    axios.post("http://localhost:5001/api/auth/login", {
      username,
      password
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,text/*;q=0.99",
      },
      withCredentials: true
    }).then((data) => {
      this.props.handler({ username: username });
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
      <div className="container" style={{height: "100%"}}>
        <div className="d-flex justify-content-center align-items-center py-auto" style={{height: "100%"}}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="usernameInput" className="form-label row pt-2 ">
                Username
              </label>
              <input
                className="row"
                id="usernameInput"
                type="username"
                name="username"
                placeholder="username"
                value={username}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordInput" className="form-label row pt-2">
                Password
              </label>
              <input
                className="row"
                id="passwordInput"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary row mt-2 px-auto">Login</button>
          </form>
        </div>
      </div>
    );
  }
}