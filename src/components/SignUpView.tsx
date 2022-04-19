import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function SignUpView() {
    const [state, setState] = React.useState({
        name: "",
        surname: "",
        username: "",
        password: "",
    })
    const navigate = useNavigate();
    const URL : string = "http://localhost:5001/api/users/create";
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="login-container">
            <form className="login-form"
                onSubmit={(event:any) => {
                    event.preventDefault();
                    const data = {
                        name: state.name,
                        surname: state.surname,
                        username: state.username,
                        password: state.password,
                    };
                    fetch(URL, {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                        }
                    })
                    .then((data) => {
                        navigate("/");
                    })
                    .catch((error: Error) => {
                        console.log(error);
                    })

                }}>

                <h1>Create an Account</h1>

                <div className="form-field">
                    <label htmlFor="NameInput">
                        Name
                    </label>
                    <input
                        id="nameInput"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={state.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="surnameInput">
                        Surname
                    </label>
                    <input
                        id="surnameInput"
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={state.surname}
                        onChange={handleInputChange}
                        required
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="usernameInput">
                        Username
                    </label>
                    <input
                        id="usernameInput"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={state.username}
                        onChange={handleInputChange}
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
                        value={state.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}

export default SignUpView;