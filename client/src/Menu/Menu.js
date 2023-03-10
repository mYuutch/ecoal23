import { Route, Link, Routes } from "react-router-dom";
import Home from "../Home/Home";
import "./Menu.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../Logout/Logout";
import Dashboard from "../Dashboard/Dashboard";
import Article from "../Article/Article";
import Addarticle from "../Addarticle/Addarticle";
import User from "../User/User";
import Search from "../Search/Search";
import Tags from "../Tags/Tags";
import Tag from "../Tags/Tag";
import Addtag from "../Tags/Addtag";
import useCookie from 'react-use-cookie';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Menu() {
    const [token, setUserToken] = useCookie('token', '0');
    const [theme, setTheme] = useState('dark');
    const [data, setData] = useState(null);

    async function getUser() {
        const response = (await axios.get('http://localhost:8000/api/user', { headers: { 'Authorization': 'Bearer ' + token } })).data;
        setData(response);
    }

    useEffect(() => {
        getUser();
    }, []);


    function isAdmin() {
        if (data) {
            if (data.admin === 1) {
                return (
                    <>
                                        <li>  <Link to="/dashboard" className="menu__item" onClick={scrollMenu}>Dashboard</Link></li>
                    <li>  <Link to="/addarticle" className="menu__item" onClick={scrollMenu}>Add an Article</Link></li>
                    <li>  <Link to="/addtag" className="menu__item" onClick={scrollMenu}>Add a Category</Link></li>
                    </>
                )
            }
        }
    }
    
        function changeTheme() {
            const head = document.head;
            const logo = document.getElementById('logoid');
            
            if (theme === 'light') {
                const link = document.createElement('style');
                link.innerHTML ="*{background-color: black;color:white;} .topnav a{color: white;background-color: black;} .blur{background-color:black !important;} .menu__box{background-color: black;} .menu__btn > span, .menu__btn > span::before, .menu__btn > span::after {background-color: white;} .tags a h3 {border: 1px solid white;}"
                logo.src='/images/logo.PNG';
                head.appendChild(link);
                setTheme('dark');
            } else {
                const link = document.createElement('style');     
                link.innerHTML ="*{background-color: white;color:black;}.topnav a{color: black;background-color: white;} .blur{background-color:white !important;} .menu__box{background-color: white;} .menu__btn > span, .menu__btn > span::before, .menu__btn > span::after {background-color: black;} .tags a h3 {border: 1px solid black;}"
                logo.src='/images/logodark.PNG';
                head.appendChild(link);
                setTheme('light');
            }
            
            }
            // Remove the link element for home.css
            const homeLink = document.querySelector('link[href="../src/Home/Home.css"]');
            if (homeLink) {
            homeLink.remove();
            }        
    
    function showMenu() {
        if (token === '0') {
            return (
                <>
                    <li><Link to="/" className="menu__item" onClick={scrollMenu}>Home</Link></li>
                    <li><Link to="/tags" className="menu__item" onClick={scrollMenu}>Categories</Link></li>
                    <li><Link to="/search" className="menu__item" onClick={scrollMenu}>All articles</Link></li>
                    <li> <Link to="/login" className="menu__item" onClick={scrollMenu}>Login</Link></li>
                    <li> <Link to="/register" className="menu__item" onClick={scrollMenu}>Register</Link></li>
                    <li> <a className="menu__item" onClick={changeTheme}>Theme</a></li>
                </>
            )
        } else {
            return (
                <>
                    <li><Link to="/" className="menu__item" onClick={scrollMenu}>Home</Link></li>
                    <li><Link to="/tags" className="menu__item" onClick={scrollMenu}>Categories</Link></li>
                    <li><Link to="/search" className="menu__item" onClick={scrollMenu}>All articles</Link></li>
                    <li><Link to="/user" className="menu__item" onClick={scrollMenu}>User</Link></li>
                    {isAdmin()}
                    <li> <Link to="/logout" className="menu__item" onClick={scrollMenu}>Logout</Link></li>
                    <li> <a className="menu__item" onClick={changeTheme}>Theme</a></li>
                </>
            )
        }
    }

    function scrollMenu() {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    // menu close when you click on a link



    return (
        <>
            <div className="topnav">
                <header>
                    <div className="topmenu">
                        <a href="/" className="active"><img id="logoid" className="logo" src="/images/logo.PNG"></img></a>
                        <a href="/" className="active textlogo">The Urban Commuter</a>

                        <div className="hamburger-menu">
                            <input id="menu__toggle" type="checkbox" />
                            <label className="menu__btn" htmlFor="menu__toggle">
                                <span></span>
                            </label>
                            <ul className="menu__box">
                                {showMenu()}
                            </ul>
                        </div>

                    </div>


                </header>

            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/user" element={<User />} />
                <Route path="/search" element={<Search />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addarticle" element={<Addarticle />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/article" element={<Article />} />
                <Route path="/tags/:id" element={<Tags />} />
                <Route path="/tags/" element={<Tags />} />
                <Route path="/tag/:id" element={<Tag />} />
                <Route path="/tag/" element={<Tag />} />
                <Route path="/addtag" element={<Addtag />} />
            </Routes>
        </>
    )
}