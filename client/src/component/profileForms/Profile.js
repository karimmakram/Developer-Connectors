import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { add_profile } from '../../redux/profile/action'
import { withRouter, Link } from 'react-router-dom'

function Profile({ add_profile, history, profile }) {
    const options = [{ value: 0, option: '* Select Professional Status' }, { value: 'Developer', option: 'Developer' },
    { value: 'Junior Developer', option: 'Junior Developer' }, { value: 'Senior Developer', option: 'Senior Developer' },
    { value: 'Manager', option: 'Manager' }, { value: 'Student or Learning', option: 'Student or Learning' },
    { value: 'Instructor', option: 'Instructor or Teacher' }, { value: 'Other', option: 'Other' }, { value: 'Intern', option: 'Intern' }
    ]
    const [socialFlag, setSocial] = useState(false)
    const [profileFlag, setProfile] = useState(true)
    const [formData, setFormData] = useState({
        status: '',
        company: '',
        website: '',
        location: '',
        skills: '',
        githubUsername: '',
        bio: '',
        facebook: '',
        youtube: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    })
    const { status, company, website, location, skills, githubUsername, bio } = formData
    const { twitter, facebook, instagram, linkedin, youtube } = formData
    const DataChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    if (profile && profileFlag) {
        console.log(profile);
        setFormData({
            status: profile.status,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            skills: profile.skills.join(','),
            githubUsername: profile.githubUsername,
            bio: profile.bio,
            facebook: profile.social.facebook,
            twitter: profile.social.twitter,
            linkedin: profile.social.linkedin,
            instagram: profile.social.instagram,
            youtube: profile.social.youtube
        })
        setProfile(false)
    }
    const submitProfile = async (e) => {
        e.preventDefault()
        const date = {
            status, company, website, location, skills, githubUsername, bio,
            social: {
                facebook, twitter, linkedin, instagram, youtube
            }
        }
        const body = JSON.stringify(date)
        if (profile)
            add_profile(body, history, true)
        else
            add_profile(body, history)

    }
    return (

        <Fragment>

            <h1 className="large text-primary">
                Create Your Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
      </p>
            <form className="form" onSubmit={submitProfile}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => DataChange(e)}>
                        {options.map((option, index) => <option key={index} value={option.value}>{option.option}</option>)}
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" value={company} placeholder="Company" onChange={e => DataChange(e)} name="company" />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" value={website} placeholder="Website" name="website" onChange={e => DataChange(e)} />
                    <small className="form-text">
                        Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" value={location} name="location" onChange={e => DataChange(e)} />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" value={skills} name="skills" onChange={e => DataChange(e)} />
                    <small className="form-text"
                    >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        value={githubUsername}
                        name="githubUsername"
                        onChange={e => DataChange(e)}
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
            username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" value={bio} name="bio" onChange={e => DataChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" className="btn btn-light" onClick={() => setSocial(!socialFlag)}>
                        Add Social Network Links
          </button>
                    <span>Optional</span>
                </div>
                {!socialFlag ? null :
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" value={twitter} name="twitter" onChange={e => DataChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" value={facebook} name="facebook" onChange={e => DataChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" value={youtube} name="youtube" onChange={e => DataChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" value={linkedin} name="linkedin" onChange={e => DataChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" value={instagram} name="instagram" onChange={e => DataChange(e)} />
                        </div>
                    </Fragment>}
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}
const mapStateToProps = state => ({ profile: state.profile.profile })
export default connect(mapStateToProps, { add_profile })(withRouter(Profile))
