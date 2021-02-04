import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Logout } from '../../action/auth'
const Header = ({ Logout, isAuthenticated, loading }) => {
    const authLinks = (<ul>
        <li><a href="profiles.html">Developers</a></li>
        <li><a href="/register">Posts</a></li>
        <li><a href="#!" onClick={Logout}>
            <i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span></a></li>
    </ul>
    )
    const guestLinks = (<ul>
        <li><a href="profiles.html">Developers</a></li>
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
