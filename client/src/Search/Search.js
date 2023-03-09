import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { all } from 'axios';
import useCookie from 'react-use-cookie';
import '../Articles/Articles.css';

export default function Search() {
    const [data, setData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useCookie('token', '0');
    const { id } = useParams();
    const [search, setSearch] = useState('');
    function inputHandelr(e) {
      var lowerCase = e.toLowerCase();
    setSearch(lowerCase)
    }
  
  
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
    
    function filtertheData(){
      setFilterData(data.filter((article) => {
        return article.title.toLowerCase().includes(search) || article.leadStory.toLowerCase().includes(search) || article.content.toLowerCase().includes(search)
      }))
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
  
  
   function allArticles(props) {
    if (userToken === '0') {
      
      if(search!=='')return (
        <div>
          {/* map the data */}
          {data && data.map((article) => {
            return (
              <div>
                {showArticlesLogged(article.title, article.leadStory, article.content, article.thumbnailURL, article.id)}
                </div>
            )
          })}
        </div>
      )
      else return (
        <div>
          {/* map the data */}
          {data && data.map((article) => {
            return (
              <div>
                {showArticlesLogged(article.title, article.leadStory, article.content, article.thumbnailURL, article.id)}
                </div>
            )
          })}
        </div>
      )
    }else {
        if(search!=='')
        return (
          
          <div>
          {/* map the data */}
          {filtertheData()}
          {data && filterData.map((article) => { 
            return (
              <div>
                {showArticlesNotLogged(article.title, article.leadStory, article.content, article.thumbnailURL, article.id)}
                </div>
            )
          })}
        </div>
          )
          else return (
            
            <div>
              {filtertheData()}
            {/* map the data */}
            {data &&filterData.map((article) => {article.title.toLowerCase().includes(search) && article.leadStory.toLowerCase().includes(search) && article.content.toLowerCase().includes(search) 
              return (
                <div>
                  {showArticlesLogged(article.title, article.leadStory, article.content, article.thumbnailURL, article.id)}
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
        <>
            <input type="text" placeholder="Search" onChange={inputHandelr} />  
            <div>
            <h2>Articles</h2>
            {data && allArticles()}
            </div>
      </>
    )

}
