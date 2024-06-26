import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
//import './Login.css';

function Login() {
    const { token, setToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log("Apretaste el form");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            contrasena: password,
            mail: email
        }).then((response) => {
            const access_token = response.data.access_token;
            setToken(access_token);

            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

    };

    return (
        <div className="Login">

            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    );
};

export default Login;

