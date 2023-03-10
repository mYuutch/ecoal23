import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './tags.css';


export default function Tags() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/tags')).data;
        setData(response);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    function showTags(name, id) {
        return (
            <div className='tags'>
                <a className="tags" href={"/tag/" + id}>
                    <h3>{name}</h3>
                </a>
            </div>
        )
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Categories</h2>
            <div className='container-tags'>
                {data && data.map((tag) => showTags(tag.name, tag.id))}
            </div>
        </div>
    )
}