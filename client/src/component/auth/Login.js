import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
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
        try {

            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                }
            }
            const date = { email, password }
            const body = JSON.stringify(date)
            const res = await axios.post('http://localhost:3006/login', body, config)
            console.log(res);

        } catch (error) {
            console.log(error.message);

        }

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

export default Login
