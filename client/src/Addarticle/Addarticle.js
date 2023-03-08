import React, { useState } from 'react';
import axios from 'axios';
import useCookie from 'react-use-cookie';
// import './Addarticle.css';

export default function Addarticle() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [token, setUserToken] = useCookie('token', '0');

    async function addArticle() {
        const response = await axios.post('http://localhost:8000/api/article', {
            title: title,
            content: content,
            thumbnailURL: thumbnailURL,
            token: token
        });
        console.log(response);
        window.location.href = '/';
    }

    return (
        <div>
            <h2>Add Article</h2>
            <div className='container-articles'>
                <div className='articles'>
                    <h3>Title</h3>
                    <input type='text' onChange={(e) => setTitle(e.target.value)} />
                    <h3>Content</h3>
                    <input type='text' onChange={(e) => setContent(e.target.value)} />
                    <h3>Thumbnail URL</h3>
                    <input type='text' onChange={(e) => setThumbnailURL(e.target.value)} />
                    <button onClick={addArticle}>Add Article</button>
                </div>
            </div>
        </div>
    )
}