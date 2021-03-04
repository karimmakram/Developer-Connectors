import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { add_exrerience } from '../../redux/profile/action'
const AddExperience = ({ add_exrerience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        current: false,
        description: ''
    })
    const [toDateDisable, toggleDisable] = useState(false)
    const DataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const SubmitData = async (e) => {
        e.preventDefault()
        add_exrerience(formData, history)
    }
    const { company, title, location, from, to, current, description } = formData
    return (
        <Fragment>

            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => SubmitData(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" value={title} onChange={e => DataChange(e)} name="title" required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" value={company} onChange={e => DataChange(e)} name="company" required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" value={location} onChange={e => DataChange(e)} name="location" />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" onChange={e => DataChange(e)} value={from} name="from" />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={() => {
                        setFormData({ ...formData, current: !current })
                        toggleDisable(!toDateDisable)
                    }} />{' '} Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" value={to} disabled={toDateDisable ? 'disable' : ''} onChange={e => DataChange(e)} name="to" />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        value={description} onChange={e => DataChange(e)}
                        placeholder="Job Description"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>

        </Fragment>
    )
}

AddExperience.propTypes = {
    add_exrerience: PropTypes.func.isRequired,
}

export default connect(null, { add_exrerience })(withRouter(AddExperience))
