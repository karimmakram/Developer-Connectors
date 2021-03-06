import React from 'react'
import PropTypes from 'prop-types'
const ProfileTop = ({ profile }) => {
    const { facebook, twitter, linkedin, youtube, instagram } = profile.social
    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={profile.user.avatarUrl}
                alt={`${profile.user.name} `}
            />
            <h1 className="large">{profile.user.name}</h1>
            <p className="lead">{profile.status} {profile.company && <span> at {profile.company}</span>}</p>
            <p>{profile.location && <span>{profile.location}</span>}</p>
            {
                <div className="icons my-1">
                    {profile.website&&<a href={profile.website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>}

                    {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>}

                    {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>}

                    {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>}

                    {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>}

                    {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>}
                </div>}
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
