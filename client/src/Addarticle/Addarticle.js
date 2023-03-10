import React, { useState } from 'react';
import axios from 'axios';
import useCookie from 'react-use-cookie';
import './Addarticle.css';
import Addtags from './Addtags';

export default function Addarticle() {
    const UPLOAD_ENDPOINT = "http://127.0.0.1:8000/api/article/";

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [token, setUserToken] = useCookie('token', '0');
    const [mediaType, setMediaType] = useState('');
    const [mediaURL, setMediaURL] = useState('');
    const [leadStory, setLeadStory] = useState('');
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState();

    async function addArticle(event) {
        event.preventDefault();
    const formData = new FormData();
    formData.append("thumbnail", file);
    formData.append("title", title); 
    formData.append("content", content);
    formData.append("mediaType", mediaType);
    formData.append("mediaURL", mediaURL);
    formData.append("leadStory", 0);
    formData.append("token", token);
    
    formData.append("tags", tags);
    const resp = await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
          "content-type": "multipart/form-data",
          "Accept": "application/json",
          "Authorization": "Bearer " + token,
        },
	})
    
    window.location.href = '/article/'+resp.data.id;
}

    return (
        <div>
            <h2>Add Article</h2>
            <div className='container-articles'>
                <div className='articles'>
                    <h3>Title</h3>
                    <input type='text' onChange={(e) => setTitle(e.target.value)} />
                    <h3>Content</h3>
                    <textarea rows={5} onChange={(e) => setContent(e.target.value)} />
                    <h3>Thumbnail (png or jpeg)</h3>
                    <input type='file'  accept='image/png, image/jpeg' id='thumbnail' name='thumbnail' onChange={(e) => setFile(e.target.files[0])}  />
                    <div className='addtags'>
                    <Addtags tags={tags} setTags={setTags} />
                    </div>
                    <h3>Media Type (optional)</h3>
                    <select onChange={(e) => setMediaType(e.target.value)}>
                        <option value="">None</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                    </select>
                    
                    <h3>Media URL (optional)</h3>
                    <input type='text' onChange={(e) => setMediaURL(e.target.value)} />
                    <button onClick={addArticle}>Add Article</button>
                </div>
            </div>
        </div>
    )
}