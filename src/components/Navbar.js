import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div id="navbar">
            <h1>Event Planner</h1>
            <nav>
            <ul>
                <li><NavLink to="/"> Home </NavLink></li>
                <li><NavLink to="/events"> Events </NavLink></li>
                <li><a href="#howTo"> How To </a></li>
                <li><a href="#plan"> Start Planning </a></li>
            </ul>
            </nav>
        </div>
    )
}

export default Navbar
