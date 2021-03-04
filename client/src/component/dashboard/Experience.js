import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { delete_experience } from '../../redux/profile/action'

function Experience({ experiences, delete_experience }) {
    return (
        experiences.length > 0 ? (
            <Fragment>
                <h2 className="my-2">Experience Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiences.map(experience => (<tr key={experience._id}>
                            <td>{experience.company}</td>
                            <td className="hide-sm">{experience.title}</td>
                            <td className="hide-sm">
                                <Moment format='DD/MM/YYYY'>{experience.from}</Moment> ::{' '} {experience.current ? '::     Now' :
                                    <Moment format='DD/MM/YYYY'>{experience.to} </Moment>}</td>
                            <td>
                                <button className="btn btn-danger" onClick={async () => {
                                    delete_experience(experience._id)
                                }}>Delete</button>
                            </td>
                        </tr>))}

                    </tbody>
                </table>
            </Fragment>) : null
    )
}

Experience.propTypes = {
    experiences: PropTypes.array.isRequired,
}

export default connect(null, { delete_experience })(Experience)

