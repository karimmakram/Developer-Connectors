import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { get_profiles } from '../../redux/profile/action'
import { ProfileItem } from './ProfileItem'
const Profiles = ({ get_profiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        get_profiles()
    }, [get_profiles])


    return (
        <Fragment>
            {loading ? <Spinner></Spinner> :
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                    <ProfileItem profiles={profiles} />
                </Fragment>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    get_profiles: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { get_profiles })(Profiles)
