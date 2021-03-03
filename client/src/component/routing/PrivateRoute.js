import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'


import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={props =>
        !auth.isAuthenticated && !auth.loading ? (<Redirect to='/login' />) :
            (<Component {...props} />)
    }
    />
)


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}
const mapStateToProp = state => {
    return ({ auth: state.auth })
}
export default connect(mapStateToProp)(PrivateRoute)

