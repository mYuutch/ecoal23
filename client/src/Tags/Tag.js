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

    function showArticles(title, content, thumbnailURL, id) {
        return (
            <div className='articles'>
                <a className="articles" href={"/article/" + id}>
                    <h3>{title}</h3>
                    <img src={'http://localhost:8000/' + thumbnailURL} alt={title} />
                    <p>{content}</p>
                </a>
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
                {data && data.map((article) => showArticles(article.title, article.content, article.thumbnailURL, article.id))}
            </div>
        </div>
    )
}