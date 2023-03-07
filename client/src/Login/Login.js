import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    const history = useNavigate();

    async function login() {
        setLoading(true);
        const response = (await axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        })).data;
        if (response.error) {
            setError(response.error);
        } else {
            setToken(response.token);
            localStorage.setItem('token', response.token);
            history('/');
        }
        setLoading(false);
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    )
}