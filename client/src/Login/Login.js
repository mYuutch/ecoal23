import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCookie from 'react-use-cookie';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useCookie('token', '0');
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate()

    async function login() {
        setLoading(true);
        const response = (await axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        })).data;
        if (response.error) {
            setError(response.error);
        } else {
            setUserToken(response['access_token'], {
                days: 365,
                SameSite: 'Strict',
                Secure: true,
            });
            setLogged(true);
            console.log(response['access_token']);
        }
        setLoading(false);
    }

    if (logged)
        window.location.href = '/'
    return (
        <div>
            <h1>Login</h1>
            <div className="login-form">
            <label>Email</label>
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button disabled = {!email||!password}  onClick={login}>Login</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    )
}