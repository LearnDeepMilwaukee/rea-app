import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import OrganizationCatalog from './pages/OrganizationCatalog.js';
import BasicTextPage from './pages/BasicTextPage.js';
import ErrorPage from './pages/ErrorPage.js';
import OrganizationRegistration from './pages/OrganizationRegistration.js';

class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={OrganizationCatalog}/>
                    <Route exact path="/text" component={BasicTextPage}/>
                    <Route path="/registration/organization" component={OrganizationRegistration}/>
                    <Route component={ErrorPage}/>

                </Switch>

            </div>

        );
    }
}

export default Routes;
