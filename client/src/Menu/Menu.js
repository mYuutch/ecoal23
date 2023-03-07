import { Route, Link, Routes } from "react-router-dom";
import Home from "../Home/Home";
import "./Menu.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../Logout/Logout";

export default function Menu() {
    return (
        <>
        <div className="navbar">
            <header>
                <nav>
                        <Link to="/">Home</Link>
                        <a href="search">Search</a>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/logout">Logout</Link>
                </nav>
            </header>
        </div>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
        </>
    )
}