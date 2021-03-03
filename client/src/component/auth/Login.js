import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../redux/auth/action'
const Login = (props) => {
    const [loginDate, setLoginDate] = useState({
        email: '',
        password: ''
    })

    const { email, password } = loginDate

    const onDateChange = (e) => {
        setLoginDate({ ...loginDate, [e.target.name]: e.target.value })
    }

    const submitLogin = async (e) => {
        e.preventDefault()
        const date = { email, password }
        const body = JSON.stringify(date)
        props.login({ body })

    }
    if (props.isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    return (
        <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={submitLogin}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        onChange={onDateChange}
                        value={email}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={onDateChange}
                        value={password}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <a href="/register">Sign Up</a>
            </p>
        </section>
    )
}
Login.prototype = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)
