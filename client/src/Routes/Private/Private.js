import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

// Logout 按下，一開始網址保持 /dashboard 但是，狀態已經登出 Redirect 到 /login
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
)

PrivateRoute.propTypes ={
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(PrivateRoute);