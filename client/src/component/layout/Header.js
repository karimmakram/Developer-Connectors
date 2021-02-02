import React from 'react'
import '../../App'
const Header = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="/"><i className="fas fa-code"></i> DevConnector</a>
            </h1>
            <ul>
                <li><a href="profiles.html">Developers</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    )
}
export default Header
