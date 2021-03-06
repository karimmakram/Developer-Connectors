import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
const ProfileEducation = ({ educations }) => {
    const exs = educations.map(education => (
        <div key={education._id}>
            <h3 className="text-dark">{education.school}</h3>
            <p>
                <Moment format='DD/MM/YY'>{education.from}</Moment>
                {' -'} {education.current ? 'Now' :
                    <Moment format='DD/MM/YY'>{education.to}</Moment>
                }</p>
            <p><strong>Degree: </strong>{education.degree}</p>
            <p><strong>Field of Study: </strong>{education.filedofstudy}</p>
            {education.description && <p><strong>Description: </strong>
                {education.description}
            </p>}

        </div>
    ))
    return (
        <Fragment>

            {exs}
        </Fragment>
    )
}

ProfileEducation.propTypes = {
    educations: PropTypes.array.isRequired,
}

export default ProfileEducation
