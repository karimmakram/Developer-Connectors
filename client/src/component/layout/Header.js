import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Logout } from '../../redux/auth/action'
const Header = ({ Logout, isAuthenticated, loading }) => {
    const authLinks = (<ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><a href="/posts">Posts</a></li>
        <li><Link to="/dashboard">
            <i className="fas fa-user"></i><span className="hide-sm">Dashboard</span></Link></li>
        <li><Link to="/login" onClick={Logout}>
            <i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span></Link></li>
    </ul>
    )
    const guestLinks = (<ul>
        <li><a href="/profiles">Developers</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
    </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="/"><i className="fas fa-code"></i> DevConnector</a>
            </h1>
            {!loading && (<Fragment>
                {isAuthenticated ? authLinks : guestLinks}
            </Fragment>)}
        </nav>
    )
}
const mapToStateProps = state => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading
    }
)
Header.prototype = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    Logout: PropTypes.func.isRequired,
}
export default connect(mapToStateProps, { Logout })(Header)
