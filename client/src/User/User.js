import useCookie from 'react-use-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import "./User.css";

export default function User() {
    const [token, setUserToken] = useCookie('token', '0');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(true);
    const [name, setName] = useState('');
    const { id } = useParams();

    function changeName() {
        setLoading(true);
        axios.put('http://localhost:8000/api/user/', {
            name: name
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            console.log(response);
            getData();
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });

        return (
            <div>
                <p>{loading && 'Loading...'}</p>
            </div>
        )
    }


    function displayUser(name, email, id) {
        return (
            <div>
                <p>{loading && 'Loading...'}</p>
                <h3>Username: {name}</h3>
                <p>Email: {email}</p>
            </div>
        )
    }

    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/user', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })).data;
        setData(response);
        setLoading(false);
        console.log(response);
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    } else {
        displayUser();
    }

    return (
        <div className="userdiv">
            <h2>User page</h2>
            {data && displayUser(data.name, data.email, data.id)}
            <div className='changeusername'>
            <label>Change username:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <button onClick={changeName}>Change username</button>
        </div>
    )
}