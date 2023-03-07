import useCookie from 'react-use-cookie';

export default function Logout() {
    const [token, setUserToken] = useCookie('token', '0');

    async function logout() {
        setUserToken('0');
        window.location.href = '/';
    }

    return (
        logout()
    )
       
}