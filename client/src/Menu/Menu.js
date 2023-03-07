import { Route, Link, Routes } from "react-router-dom";
import Home from "../Home/Home";
import "./Menu.css";

export default function Menu() {
    return (
        <>
        <div className="navbar">
            <header>
                <nav>
                        <Link to="/">Home</Link>
                        <a href="search">Search</a>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                </nav>
            </header>
        </div>

        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        </>
    )
}