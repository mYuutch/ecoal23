import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Tag() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/articles/tag/'+id)).data;
        setData(response);
        setLoading(false);
        console.log(response);
    }

    useEffect(() => {
        getData();
    }, []);

    function showArticles(title, content, thumbnailURL, id, leadStory) {
        return (
            <div className='articles'>
            <h3>{title}</h3>
            <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
            <p className="articletext">{content}</p>
    
            <div className="abovetext">
              <div className="blur"></div>
              <a className="readmore" href={"/article/" + id}>
                <p>Read more</p>
                <button className='readmorebutton'><i className='bx bx-down-arrow-alt' ></i></button>
              </a>
            </div>
          </div>
        )
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Articles by tag</h2>
            <div className='container-articles'>
                {data && data.map((article) => showArticles(article.title, article.content, article.thumbnailURL, article.id, article.leadStory))}
            </div>
        </div>
    )
}