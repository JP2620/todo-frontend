import axios from "axios";
import React, { Component } from "react";


export default class LogInForm extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLFormElement | HTMLInputElement>) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event: any) {
        const { username, password }: any = this.state;
        console.log(this.state);
        event.preventDefault();
        const data = await axios.post("http://localhost:5001/api/auth/login", {
            username,
            password
        },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json,text/*;q=0.99"
            }
        })
 
        console.log(data);
    }
    
    render() {
        const { username, password }: any = this.state;
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="username"
                name="username"
                placeholder="username"
                value={username}
                onChange={this.handleChange}
                required
              />
    
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                required
              />
    
              <button type="submit">Login</button>
            </form>
          </div>
        );
      }
}