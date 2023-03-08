import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { all } from 'axios';
import useCookie from 'react-use-cookie';

export default function Search() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useCookie('token', '0');
    const { id } = useParams();
    const [search, setSearch] = useState('');
  
  
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
  
  
   function allArticles(props) {
    if (userToken === '0') {
      
      if(search!=='')return (
        <div>
         
          {data.title.includes(search) && showArticlesNotLogged(data.title, data.thumbnail, data.leadStory, data.id)}
        </div>
      )
      else return (
        <div>
          {data && showArticlesNotLogged(data.title, data.thumbnail, data.leadStory, data.id)}
        </div>
      )
    }else {
        if(search!=='')return (
            <div>
             
              {data.title.includes(search) && showArticlesLogged(data.title, data.thumbnail, data.leadStory, data.id)}
            </div>
          )
          else return (
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
        <>
            <input type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} />  
            <div>
            <h2>Articles</h2>
            {data && allArticles()}
            </div>
      </>
    )

}
