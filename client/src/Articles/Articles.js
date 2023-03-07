import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { useParams } from 'react-router-dom';
import useCookie from 'react-use-cookie';

export default function Articles() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useCookie('token', '0');
  const { id } = useParams();


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

  function showArticlesLogged(title, content, thumbnail, id) {
    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        <img src={thumbnail} alt={title} />
        <a href={"/article/" + id}>
          <button>Read more</button>
        </a>
      </div>
    )
  }

  function showArticlesNotLogged(title, thumbnail, leadStory, id) {
    return (
      <div>
        <h3>{title}</h3>
        <p>{leadStory}</p>
        <img src={thumbnail} alt={title} />
      </div>
    )
  }


 function allArticles() {
  if (userToken === '0') {
    return (
      <div>
        {data && showArticlesNotLogged(data.title, data.thumbnail, data.leadStory, data.id)}
      </div>
    )
  }else {
    return (
      <div>
        {data && showArticlesLogged(data.title, data.content, data.thumbnail, data.id, data.leadStory)}
      </div>
    )
  }
}

  if (loading) {
    return <p>Loading...</p>;
  } else {
    allArticles();
  }

  return (
    <div>
      <h2>Articles</h2>
      {data && allArticles()}
    </div>
  )
}