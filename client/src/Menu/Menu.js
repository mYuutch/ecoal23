import { Route, Link, Routes } from "react-router-dom";
import Home from "../Home/Home";
import "./Menu.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../Logout/Logout";
import Dashboard from "../Dashboard/Dashboard";
import Article from "../Article/Article";
import User from "../User/User";
import useCookie from 'react-use-cookie';

export default function Menu() {
    const [token, setUserToken] = useCookie('token', '0');

    function showMenu() {
        if (token === '0') {
            return (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to="/user">User</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/logout">Logout</Link>
                </>
            )
        }
    }

    function Menuu() {
        if(token !== '0') {
            return (
                <>
                    <Link to="/">Home</Link>
                    <a href="search">Search</a>
                </>
            )
        }
    }


    return (
        <>
        <div className="navbar">
            <header>
                <nav>
                        <Link to="/">Home</Link>
                        <a href="search">Search</a>
                        {showMenu()}
                </nav>
            </header>
        </div>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/user" element={<User />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/article" element={<Article />} />
        </Routes>
        </>
    )
}