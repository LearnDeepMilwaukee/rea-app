import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import OrganizationCatalog from './pages/OrganizationCatalog.js';
import BasicTextPage from './pages/BasicTextPage.js';
import ErrorPage from './pages/ErrorPage.js';
import LoginPage from './pages/LoginPage.js';
import SearchResults from './pages/oldReaapp/organizationCatalog'
// import OrganizationRegistration from './pages/oldReaapp/organizationRegistration';
import Header from './pages/Header.js';
import ProtectedRoute from './ProtectedRoute.js';

class Routes extends Component {
    render() {
        return (
            <div>
                {/*<Route path="/" render={(props) => (props.location.pathname !== "/login") && <LoginBarrier/>}/>*/}
                <Route path="/" render={(props) => (props.location.pathname !== "/login") && <Header/>}/>

                <ProtectedRoute exact path="/" component={OrganizationCatalog}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/text" component={BasicTextPage}/>
                <Route exact path="/test" component={SearchResults}/>
            </div>

        );
    }
}

export default Routes;
