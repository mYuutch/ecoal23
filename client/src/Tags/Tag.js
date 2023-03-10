import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Tags from './Tags';
import useCookie from 'react-use-cookie';


export default function Tag() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useCookie('token', '0');
    const { id } = useParams();

    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/articles/tag/'+id)).data;
        setData(response);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    function showArticlesLogged(title, thumbnailURL, leadStory, id, content) {
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

    function showArticlesNotLogged(title, thumbnailURL, leadStory, id) {
        return (
          <div className='articles'>
          <h3>{title}</h3>
          <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
        </div>
        )
  
    }

    function allArticles() {
        if (userToken === '0') {
          return (
            <div>
              {/* map the data */}
              {data && data.map((article) => {
                return (
                  <div>
                    {showArticlesNotLogged(article.title, article.thumbnailURL, article.leadStory, article.id)}
                    </div>
                )
              })}
            </div>
          )
        } else {
          return (
            <div>
              {/* map the data */}
              {data && data.map((article) => {
                return (
                  <div>
                    {showArticlesLogged(article.title, article.thumbnailURL, article.leadStory, article.id, article.content)}
                    </div>
                )
              })}
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