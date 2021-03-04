import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { add_education } from '../../redux/profile/action'
const AddEducation = ({ add_education, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        filedofstudy: '',
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
        add_education(formData, history)
    }
    const { school, degree, filedofstudy, from, to, current, description } = formData
    return (
        <Fragment>

            <h1 className="large text-primary">
                Add An Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any School or bootCamp that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => SubmitData(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* school" value={school} onChange={e => DataChange(e)} name="school" required />
                </div><div className="form-group">
                    <input type="text" placeholder="* Degree or Certificate" value={degree} onChange={e => DataChange(e)} name="degree" required />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Filed of Study" value={filedofstudy} onChange={e => DataChange(e)} name="filedofstudy" />
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

AddEducation.propTypes = {
    add_education: PropTypes.func.isRequired,
}

export default connect(null, { add_education })(withRouter(AddEducation))
