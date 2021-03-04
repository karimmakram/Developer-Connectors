import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { delete_education } from '../../redux/profile/action'
function Education({ educations, delete_education }) {
    return (
        educations.length > 0 ? (
            <Fragment>

                <h2 className="my-2">Education Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {educations.map(education => (<tr key={education._id}>
                            <td>{education.school}</td>
                            <td className="hide-sm">{education.degree}</td>
                            <td className="hide-sm">
                                <Moment format='DD/MM/YYYY'>{education.from}</Moment> ::{' '} {education.current ? '::     Now' :
                                    <Moment format='DD/MM/YYYY'>{education.to}</Moment>}</td>
                            <td>
                                <button className="btn btn-danger" onClick={async () => {
                                    delete_education(education._id)
                                }}>Delete</button>
                            </td>
                        </tr>))}

                    </tbody>
                </table>
            </Fragment>) : null
    )
}

Education.propTypes = {
    educations: PropTypes.array.isRequired,
}

export default connect(null, { delete_education })(Education)

