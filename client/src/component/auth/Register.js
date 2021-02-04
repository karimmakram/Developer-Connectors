import React, { Component } from 'react'
import { setAlert } from '../../action/alert'
import { register } from '../../action/auth'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Register extends Component {
    state = ({
        name: '',
        password: '',
        email: '',
        password2: '',
        avatar: null
    })

    ondataChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({ ...this.state, [e.target.name]: e.target.value })

    }

    uploadImage = (e) => {
        console.log(e.target.files[0]);
        this.setState({ ...this.state, avatar: e.target.files[0] })
        // const imgProfile = document.querySelector('#img')
        // imgProfile.setAttribute('src', URL.createObjectURL(e.target.files[0]))
        // imgProfile.setAttribute('justify-content', 'center')
        // imgProfile.setAttribute('height', '200px')
    }
    onSubmit = async (e) => {
        e.preventDefault()
        if (this.state.password !== this.state.password2) {
            return this.props.setAlert('password do not match', 'danger')
        }
        const body = new FormData()
        body.append('avatar', this.state.avatar)
        body.append('name', this.state.name)
        body.append('email', this.state.email)
        body.append('password', this.state.password)
        this.props.register({
            body
        })
    }


    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div>
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={e => this.ondataChange(e)}
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            onChange={e => this.ondataChange(e)}
                            name="email"
                            required />
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            onChange={e => this.ondataChange(e)}
                            placeholder="Password"
                            name="password"
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            onChange={e => this.ondataChange(e)}
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        {/* <img
                            id="img"
                            alt=''
                        // className="round-img"
                        /> */}
                        <label >Choose a profile picture:</label>
                        <input
                            type="file"
                            onChange={this.uploadImage}
                            name="avatar"
                            accept="image/png, image/jpeg"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <a href="/login">Sign In</a>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { setAlert, register })(Register)
