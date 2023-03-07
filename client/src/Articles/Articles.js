import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Articles() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const response = (await axios.get('http://localhost:8000/api/articles')).data;
    setData(response[0]);
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
        <p>{content}</p>
        <img src={thumbnail} alt={title} />
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
      {data && showArticles(data.title, data.content, data.thumbnail, data.id)}
    </div>
  )
}