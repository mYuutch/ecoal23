import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Articles() {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(false);
  const token = '4|zAtDuGC553HOOWJgS0xrFV0HnxEaVvZkKTakBCKE';

  async function getData() {
    setLoading(true);
    const response = (await axios.get('http://localhost:8000/api/user', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        }
    })).data;
        setData(response);
        setLoading(false);
        console.log(response);
      }

  useEffect(() => {
    getData();
  }, []);

  function showArticles(name, email, id) {
    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            <p>{id}</p>
        </div>
    )
  }


  if (loading) {
    return <p>Loading...</p>;
  } else {
    showArticles()
  }

    return (
        <div>
            <h2>Articles</h2>
            {data && showArticles(data.name, data.email, data.id)}
        </div>
    )
}