import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { get_profile, delete_Account } from '../../redux/profile/action'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardAction'
import Experience from './Experience'
import Education from './Education'
function Dashboard({ get_profile, delete_Account, profile: { profile, loading }, auth: { user } }) {
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
                        <Experience experiences={profile.experience} />
                        <Education educations={profile.education} />

                        <div class="my-2">
                            <button class="btn btn-danger" onClick={delete_Account}>
                                <i class="fas fa-user-minus"></i>
                                Delete My Account
                            </button>
                        </div>
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
export default connect(mapStateToProps, { get_profile, delete_Account })(Dashboard)
