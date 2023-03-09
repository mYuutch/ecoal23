import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Addtags(props) {
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
    useEffect(() => {
        getData();
    }, []);


    function manageTags(tag) {
        let tags = props.tags;
        if (tags.includes(tag)) {
            tags = tags.filter((t) => t !== tag);
        } else {
            tags.push(tag);
        }
        props.setTags(tags);
    }

    function showTags(name, id) {
        return (
            <div className='tags'>
                <label htmlFor={id}>{name}</label>
                <input type="checkbox" id={id} name={'tags[]'} value={id} onChange={(e) => {manageTags(e.target.value)}} />
            </div>
        )
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Tags</h2>
                {data && data.map((tag) => showTags(tag.name, tag.id))}
        </div>
    )
}