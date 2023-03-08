import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCookie from 'react-use-cookie';
import './Register.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useCookie('token', '0');
    const [registered, setRegistered ] = useState(false)
    const navigate = useNavigate()

    async function register(e) {
        e.preventDefault();
        setLoading(true);
        const response = (await axios.post('http://localhost:8000/api/register', {
            name: name,
            email: email,
            password: password,
        })).data;
        setLoading(false);
        setRegistered(true);
        console.log(response);
        if (response.error) {
            setError(response.error);
        } else {
            setUserToken(response['access_token'], {
                days: 365,
                SameSite: 'Strict',
                Secure: true,
            });
            setRegistered(true);
            console.log(response['access_token']);
        }
    }

      


    if (registered)
    window.location.href = '/'

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={register}>
                <div className="error">{error}</div>
                <div className='register-form'>
                <label>Name</label>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <label>Email</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}