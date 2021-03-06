import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const ProfileItem = ({ profiles }) => {
    const profilesShow = profiles.map(profile => (
        <div className="profiles" key={profile._id} >
            <div className="profile bg-light">
                <img
                    className="round-img"
                    src={profile.user.avatarUrl}
                    alt=""
                />
                <div>
                    <h2>{profile.user.name}</h2>
                    <p>{profile.company}</p>
                    <p>{profile.location && profile.location}</p>
                    <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">View Profile</Link>
                </div>

                <ul>
                    {profile.skills.slice(0, 4).map((skill, index) => (
                        <li className="text-primary" key={index}>
                            <i className="fas fa-check"></i> {skill}
                        </li>))}

                </ul>
            </div>
        </div>
    ))

    return (
        <Fragment>
            {profilesShow}
        </Fragment>
    )
}



ProfileItem.propTypes = {
    profiles: PropTypes.array.isRequired,
}
export default ProfileItem