import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_profile_byId } from '../../../redux/profile/action'
import Spinner from '../../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
const Profile = ({ match, get_profile_byId, profile: { profile, loading }, auth: { isAuthenticated, user } }) => {
    useEffect(() => {
        get_profile_byId(match.params.id)
    }, [get_profile_byId, match.params.id])
    return (
        <Fragment>
            {profile === null ? <Spinner /> : <Fragment>
                <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                {isAuthenticated && user._id === profile.user._id && (
                    <Link to="/create-profile" className="btn btn-dark">Edit Profile</Link>
                )}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? <ProfileExperience experiences={profile.experience} /> :
                            <h4>No Experience</h4>
                        }
                    </div>

                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ? <ProfileEducation educations={profile.education} /> :
                            <h4>No Education</h4>
                        }
                    </div>
                </div>
                {profile.githubUsername ? <ProfileGithub username={profile.githubUsername} /> : null}
            </Fragment>}
        </Fragment>
    )
}
Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    get_profile_byId: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { get_profile_byId })(Profile)


