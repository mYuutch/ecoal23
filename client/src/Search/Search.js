import React, { useEffect, useState } from "react";
import axios from "axios";
import './Search.css';
import useCookie from 'react-use-cookie';



export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useCookie('token', '0');

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getData() {
    const response = (await axios.get('http://localhost:8000/api/articles/')).data;
    setData(response);
    console.log(response);
  }

  useEffect(() => {
    getData();
  }, [search]);

  function showArticlesLogged(title, content, thumbnailURL, id, leadStory) {
    return (
        <div className='articles'>
        <h3>{title}</h3>
        <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
        <p className="articletext">{content}</p>

        <div className="abovetext">
          <div className="blur"></div>
          <a className="readmore" href={"/article/" + id}>
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
                {/* filter the data */}
                {article.title.toLowerCase().includes(search.toLowerCase()) && showArticlesNotLogged(article.title, article.thumbnailURL, article.leadStory, article.id)}
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
                {/* filter the data */}
                {article.title.toLowerCase().includes(search.toLowerCase()) && showArticlesLogged(article.title, article.content, article.thumbnailURL, article.id, article.leadStory)}
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
    <div className="search">
      <h2>Search</h2>
      <input type="text" value={search} onChange={handleChange} />
      <div className='container-articles'>
        {allArticles()}
        </div>
    </div>
  )
}