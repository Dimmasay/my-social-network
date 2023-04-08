import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {

            return ((props.isAuth)
                    ? <Component {...props}/>
                    : <Navigate to='/login'/>
            )
    }

    let mapStateToProps = (state) => {
        return {
            isAuth: state.auth.isAuth,
            // initialized: state.app.initialized

        }
    }
    const ConnectedRedirectComponent = connect(mapStateToProps, {})(RedirectComponent)

    return ConnectedRedirectComponent
}

