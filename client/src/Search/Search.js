import React, { useEffect, useState } from "react";
import axios from "axios";
import './Search.css';



export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

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

  function displaySearch(title, content, thumbnailURL, id) {
    return (
      <div className='articles'>
        <a className="articles" href={"/article/" + id}>
          <h3>{title}</h3>
          <img src={'http://localhost:8000/' + thumbnailURL} alt={title} />
          <p>{content}</p>

          <div className="abovetext">
          <div className="blur"></div>
          <a className="readmore" href={"/article/" + id}>
            <p>Read more</p>
            <button className='readmorebutton'><i class='bx bx-down-arrow-alt' ></i></button>
          </a>
        </div>

        </a>
      </div>
    )
  }



  return (
    <div className="search">
      <h2>Search</h2>
      
      <input type="text" value={search} onChange={handleChange} />
      <div className='container-articles'>
        {data && data.filter((article) => article.title.toLowerCase().includes(search.toLowerCase())).map((article) => displaySearch(article.title, article.content, article.thumbnailURL, article.id))}
        </div>
    </div>
  )
}