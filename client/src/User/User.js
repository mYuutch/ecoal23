import useCookie from 'react-use-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { render } from '@testing-library/react';

export default function User() {
    const [token, setUserToken] = useCookie('token', '0');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [flag , setFlag] = useState(true);

    function changeName() {  
        if (flag) {
            setFlag(false);
              
        
        render (
            <div>
                <input type="text" placeholder="New username" />
                <input type="button" value="Change" />
            </div>
        )
        }
    }

    function displayUser(name, email) {
        return (
            <div>
                <p>{loading && 'Loading...'}</p>
                <h3>{name}</h3>
                <button onClick={changeName}>Change username</button>
                <p>{email}</p>
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
        <div>
            <h2>User</h2>
            {data && displayUser(data.name, data.email)}
        </div>
    )
}