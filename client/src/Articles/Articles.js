import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { useParams } from 'react-router-dom';
import useCookie from 'react-use-cookie';
import './Articles.css';

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
    console.log(response[0]);
  }

  useEffect(() => {
    getData();
  }, []);

  function showArticlesLogged(title, content, thumbnailURL, id) {
    return (
      <div className='articles'>
        <h3>{title}</h3>
        <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
        <p>{content}</p>
        <a href={"/article/" + id}>
          <button className='readmore'>Read more</button>
        </a>
      </div>
    )
  }

  function showArticlesNotLogged(title, thumbnailURL, leadStory, id) {
    return (
      <div>
        <h3>{title}</h3>
        <p>{leadStory}</p>
        <img src={thumbnailURL} alt={title} />
      </div>
    )
  }


  function allArticles() {
    if (userToken === '0') {
      return (
        <div>
          {data && showArticlesNotLogged(data.title, data.thumbnailURL, data.leadStory, data.id)}
        </div>
      )
    } else {
      return (
        <div>
          {data && showArticlesLogged(data.title, data.content, data.thumbnailURL, data.id, data.leadStory)}
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
    <div className='container-articles'>
      {data && allArticles()}
    </div>
  )
}