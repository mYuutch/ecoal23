import React, { useState } from 'react';
import axios from 'axios';
import './Addtag.css';

export default function Addtag() {
    const [name, setName] = useState('');
    const [data, setData] = useState(null);

    async function postTag() {
        const response = await axios.post('http://localhost:8000/api/tag/create', {
            name: name,
        });
        console.log(response);
        setData(response);
        window.location.href = '/tags';
    }

    function handleSubmit(e) {
        e.preventDefault();
        postTag();
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <div className='addtag'>
            <h1>Add a Category</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange} />
                <button type="submit">Add tag</button>
            </form>
        </div>
    )
}