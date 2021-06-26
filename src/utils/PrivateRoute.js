import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: RouteComponent, ...rest}) => {

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                localStorage.getItem('access_token') ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={'/auth/login'}/>
                )
            }
        />
    )
}

export default PrivateRoute
