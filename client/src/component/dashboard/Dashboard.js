import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { get_profile } from '../../redux/profile/action'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardAction'
function Dashboard({ get_profile, profile: { profile, loading }, auth: { user } }) {
    useEffect(() => {
        get_profile();
    }, [])
    return (
        loading && profile === null ? <Spinner /> :
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {user && (user.name.split(' '))[0]}</p>
                <Fragment>
                    {profile !== null ? <Fragment>
                        <DashboardAction />
                    </Fragment> :
                        <Fragment>
                            <p>you have not yet setup a profile,please add some info</p>
                            <Link to="/create-profile" className="btn btn-primary my-1">
                                Create Profile
                            </Link>
                        </Fragment>

                    }
                </Fragment>
            </Fragment>
    )
}
const mapStateToProps = state => ({ profile: state.profile, auth: state.auth })
export default connect(mapStateToProps, { get_profile })(Dashboard)
