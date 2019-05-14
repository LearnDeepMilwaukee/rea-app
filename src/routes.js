import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import OrganizationCatalog from './pages/OrganizationCatalog.js';
import OrganizationInventory from './pages/Organizations/organizationInventory';
import ErrorPage from './pages/ErrorPage.js';
import LoginPage from './pages/LoginPage.js';
import ProtectedRoute from './ProtectedRoute.js';
import OrganizationRegistration from './pages/Organizations/organizationRegistration';
import IndividualRegistration from './pages/Individuals/individualRegistration';
import orgEdit from "./pages/Organizations/organizationEdit";
import Header from './pages/Header/Header.js';
import UnitPage from './pages/Api/unit';
import OrgTypePage from './pages/Api/orgType';
import ProcessClassificationPage from './pages/Api/processClassification';
import OrganizationPage from './pages/Api/organization';
import EconomicResourcePage from './pages/Api/economicResource';
import AgentRelationship from './pages/Api/agentRelationship';
import AgentPage from './pages/Api/agent';
import Process from './pages/Api/process';
import Plan from './pages/Api/plan';
import PersonPage from './pages/Api/person';
import EconomicEvent from './pages/Api/EconomicEvent'
import CreateEconomicEvent from './pages/Api/CreateEconomicEvent'
import AgentRelationshipRoles from './pages/Api/AgentRelationshipRole'
import CreateInventoryItem from './pages/Inventory/createInventoryItem'

class Routes extends Component {
    render() {
        return (
            <div>

                {/*<Header/>*/}
                <Route path="/" render={(props) => (props.location.pathname !== "/login" && props.location.pathname !== "/RegisterIndividual") && <Header/>}/>
                <Switch>
                    <Route exact path="/login" component={LoginPage}/>
                    <ProtectedRoute exact path="/RegisterOrg" component={OrganizationRegistration}/>
                    <ProtectedRoute exact path="/EditOrg/:id" component={orgEdit}/>
                    <ProtectedRoute exact path="/OrgInventory/:id" component={OrganizationInventory}/>
                    <ProtectedRoute exact path="/RegisterIndividual" component={IndividualRegistration}/>
                    <ProtectedRoute exact path="/" component={OrganizationCatalog}/>
                    <ProtectedRoute exact path="/CreateInventoryItem/:orgId" component={CreateInventoryItem}/>
                    {/*Below here are the api pages*/}
                    {/*<Route path="/api/processClassification" component={ProcessClassificationPage}/>*/}
                    {/*<Route path="/api/unit" component={UnitPage}/>*/}
                    {/*<Route path="/api/orgType" component={OrgTypePage}/>*/}
                    {/*<Route path="/api/agent" component={AgentPage}/>*/}
                    {/*<Route path="/api/organization" component={OrganizationPage}/>*/}
                    {/*<Route path="/api/economicresource" component={EconomicResourcePage}/>*/}
                    {/*<Route path="/api/agentrelationship" component={AgentRelationship}/>*/}
                    {/*<Route path="/api/process" component={Process}/>*/}
                    {/*<Route path="/api/plan" component={Plan}/>*/}
                    {/*<Route path="/api/person" component={PersonPage}/>*/}
                    {/*<Route path="/api/agentrelationshiprole" component={AgentRelationshipRoles}/>*/}
                    {/*<Route path="/api/createeconomicevent" component={CreateEconomicEvent}/>*/}
                    {/**/}
                    {/*<Route path="/api/economicevent" component={EconomicEvent}/>*/}

                    <Route component={ErrorPage}/>
                </Switch>
            </div>

        );
    }
}

export default Routes;
