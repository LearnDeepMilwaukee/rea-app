import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import OrganizationCatalog from './pages/OrganizationCatalog.js';
import BasicTextPage from './pages/BasicTextPage.js';
import ErrorPage from './pages/ErrorPage.js';
import LoginPage from './pages/LoginPage.js';
import SearchResults from './pages/OrganizationCatalog';
import ViewInventory from './pages/ViewInventory';
import OrganizationRegistration from './pages/oldReaapp/organizationRegistration';
// import Header from './pages/Header.js';

class Routes extends Component {
    render() {
        return (
            <div>
                {/*<Header/>*/}
                <Switch>
                    <Route exact path="/" component={OrganizationCatalog}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/text" component={BasicTextPage}/>
                    <Route exact path = "/inventory" component={ViewInventory}/>

                    <Route exact path = "/orgCatalog" component={SearchResults}/>
                    <Route exact path = "/RegisterOrg" component={OrganizationRegistration}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </div>

        );
    }
}

export default Routes;
