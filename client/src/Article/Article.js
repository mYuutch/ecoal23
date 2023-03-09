import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Article.css';


export default function Article() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/article/'+id)).data;
        setData(response);
        setLoading(false);
        console.log(response);
      }
    
      useEffect(() => {
        getData();
      }, []);
    
      function showArticles(title, content, thumbnailURL, id) {
        return (
          <div className='article'>
            <h3>{title}</h3>
            <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
            <p>{content}</p>
          </div>
        )
      }

      if (loading) {
        return <p>Loading...</p>;
      }

    return (
        <div>
            <h2>Article</h2>
            <div className='container-articles'>
            {data && showArticles(data.title, data.content, data.thumbnailURL, data.id)}
            </div>
        </div>
    )
}