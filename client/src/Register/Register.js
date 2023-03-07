import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function register(e) {
        e.preventDefault();
        setLoading(true);
        const response = (await axios.post('http://localhost:8000/api/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        })).data;
        setLoading(false);
        console.log(response);
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={register}>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" onChange={(e) => setPassword_confirmation(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}