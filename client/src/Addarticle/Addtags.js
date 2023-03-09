import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Addtags() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/tags')).data;
        setData(response);
        setLoading(false);
        console.log(response);
    }

    async function addTag() {
        const response = (await axios.post('http://localhost:8000/api/article/'+id+'/tags', {
            tags: [1, 2]
        })).data;
        console.log(response);
    }

    useEffect(() => {
        getData();
    }, []);

    function showTags(name, id) {
        return (
            <div className='tags'>
                <label for={id}>{name}</label>
                <input type="checkbox" id={id} name={name} value={id} />
            </div>
        )
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Tags</h2>
            <div className='container-tags'>
                {data && data.map((tag) => showTags(tag.name, tag.id))}
            </div>
        </div>
    )
}