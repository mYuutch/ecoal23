import React, { useState } from 'react';
import axios from 'axios';
import useCookie from 'react-use-cookie';
// import './Addarticle.css';

export default function Addarticle() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [token, setUserToken] = useCookie('token', '0');
    const [mediaType, setMediaType] = useState('');
    const [mediaURL, setMediaURL] = useState('');

    async function addArticle() {
        const response = await axios.post('http://localhost:8000/api/article', {
            title: title,
            content: content,
            thumbnailURL: thumbnailURL,
            mediaType : mediaType,
            mediaURL : mediaURL,
            leadStory: true,
            token: token
        });
        console.log(response);
        window.location.href = '/';
    }

    function changePath() {
        const file = document.getElementById('thumbnailURL');
        const path = file.value;
        const filename = path.replace(/^.*\\/, "");
        console.log(filename);
        setThumbnailURL(filename);
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
                    <h3>Thumbnail (only png or jpeg)</h3>
                    <input type='file'  accept='image/png, image/jpeg' id='thumbnail' name='thumbnail' onChange={changePath} />
                    <h3>Media Type</h3>
                    <select onChange={(e) => setMediaType(e.target.value)}>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                    </select>
                    <h3>Media URL</h3>
                    <input type='text' onChange={(e) => setMediaURL(e.target.value)} />
                    <button onClick={addArticle}>Add Article</button>
                </div>
            </div>
        </div>
    )
}