import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
    
      function showArticles(title, content, thumbnail, id) {
        return (
          <div>
            <h3>{title}</h3>
            <img src={thumbnail} alt={title} />
            <p>{content}</p>
          </div>
        )
      }

    return (
        <div>
            <h2>Each Article</h2>
            {data && showArticles(data.title, data.content, data.thumbnail, data.id)}
        </div>
    )
}