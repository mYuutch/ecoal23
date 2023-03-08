import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Articles/Articles.css'

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();


    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/articles')).data;
        setData(response[0]);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    function showArticlesLogged(title, content, thumbnailURL, id) {
       
        function deleteArticle() {
            axios.delete('http://localhost:8000/api/article/' + id)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    window.location.reload();
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
                <p>{content}</p>
                <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
                <a href={"/article/" + id}>
                    <button>Read more</button>
                </a>
            </div>
            <div>
                <button onClick={editArticle}>Edit</button>
                <button onClick={deleteArticle}>Delete</button>
            </div>
            </>
        )
    }

    function articlesDashboard() {
        if (data) {
            return (
                <div>
                    {showArticlesLogged(data.title, data.content, data.thumbnailURL, data.id)}
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