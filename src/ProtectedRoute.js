import React, { Component } from 'react';
import {Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class ProtectedRoute extends Component {
    redirect(){
        //The user is logged out, redirect them to the login page
        this.props.history.push("/login");
        window.location.reload();
    }

    render() {
        const { component: Component, ...props} = this.props;

        return (
            <Route
                {...props}
                render={props => (
                    (this.props.currentUserToken === "N/A") ?
                        (this.redirect()) :
                        <Component {...props} />
                    )}
                />
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUserToken: state.getUserInfo.currentUserToken,
    };
}

export default withRouter(connect(
    mapStateToProps
)(ProtectedRoute));