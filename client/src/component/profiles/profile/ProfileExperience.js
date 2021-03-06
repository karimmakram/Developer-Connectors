import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
const ProfileExperience = ({ experiences }) => {
    const exs = experiences.map(experience => (
        <div key={experience._id}>
            <h3 className="text-dark">{experience.company}</h3>
            <p>
                <Moment format='DD/MM/YY'>{experience.from}</Moment>
                {' -'} {experience.current ? 'Now' :
                    <Moment format='DD/MM/YY'>{experience.to}</Moment>
                }</p>
            <p><strong>Position: </strong>{experience.title}</p>
            {experience.description && <p><strong>Description: </strong>
                {experience.description}
            </p>}

        </div>
    ))
    return (
        <Fragment>

            {exs}
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    experiences: PropTypes.array.isRequired,
}

export default ProfileExperience
