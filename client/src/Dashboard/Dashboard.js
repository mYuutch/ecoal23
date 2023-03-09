import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Articles/Articles.css'

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/articles')).data;
        setData(response);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    function showArticlesLogged(title, content, thumbnailURL, id) {
       
        function deleteArticle() {
            axios.delete('http://localhost:8000/api/article/' + id)
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                })

        }

        function editArticle() {

            render(
                <div>
                    <h2>Edit an Article</h2>
                    <form>
                        <input type="text" placeholder="Title*" />
                        <input type="text" placeholder="Content*" />
                        <input type="text" placeholder="Thumbnail*" />
                        <input type="text" placeholder="Media (URL)" />
                        <input type="text" placeholder="Lead Story*" />
                        <button type="submit">Edit</button>
                    </form>
                </div>
            )
        }

        return (
            <>
        <div className='articles'>
        <h3>{title}</h3>
        <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
        <p>{content}</p>

        <div className="abovetext">
          <div className="blur"></div>
          <a className="readmore" href={"/article/" + id}>
            <p>Read more</p>
            <button className='readmorebutton'><i class='bx bx-down-arrow-alt' ></i></button>
          </a>
        </div>
      </div>
            <div className='deletediv'>
                <button className='deletebtn' onClick={deleteArticle}>Delete</button>
            </div>
            </>
        )
    }

    function articlesDashboard() {
        if (data) {
            return (
                <div>
                    {data.map((article) => showArticlesLogged(article.title, article.content, article.thumbnailURL, article.id))}
                </div>
            )
        }else{
            return <h1>No articles.</h1>;
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <div className='container-articles'>
            {articlesDashboard()}
            </div>
        </div>
    )
}