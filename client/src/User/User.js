import useCookie from 'react-use-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { render } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import "./User.css";

export default function User() {
    const [token, setUserToken] = useCookie('token', '0');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(true);
    const [name, setName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

   async function changeName() {
       await axios.put('http://localhost:8000/api/updateUsername/', {
            name: name
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((response) => {
            console.log(response);
            setFlag(!flag);
        }).catch((error) => {
            console.log(error);
        });
        
        window.location.reload();
    }


    function displayUser(name, email, id) {
        return (
            <div className='User-infos'>
                <h4>{loading && 'Loading...'}</h4>
                <h2>Username: <p>{name}</p></h2>
                <h2 className='email'>Email: <p>{email}</p></h2>
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
            <h1>User infos</h1>
            {data && displayUser(data.name, data.email, data.id)}
            <div className='changeusername'>
            <label>Change username:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <button onClick={changeName}>Change username</button>
            </div>
        </div>
    )
}