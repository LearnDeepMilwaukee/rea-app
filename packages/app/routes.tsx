import * as React from "react";
import { Route, IndexRoute, IndexRedirect } from "react-router";

import App from "./main/App";
import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import OverviewPage from "./pages/Overview";
import MembersPage from "./pages/Members";
import AllProjectsPage from "./pages/AllProjectsPage";
import ProcessesPage from "./pages/Processes";
import InventoryPage from "./pages/Inventory";
import AccountsPage from "./pages/Accounts";
import SingleProjectTemplate from "../ui-views/templates/SingleProjectTemplate";
import ProcessClassificationPage from "./pages/Api/processClassification";
import PersonPage from "./pages/Api/person";
import UnitPage from "./pages/Api/unit";
import OrgTypePage from "./pages/Api/orgType";
import AgentPage from "./pages/Api/agent";
import OrganizationPage from "./pages/Api/organization";
import EconomicResourcePage from "./pages/Api/economicResource";
import ProjectTemplate from "../ui-views/templates/ProjectTemplate";
import EconomicEvent from "./pages/EconomicEvent/EconomicEvent";
import AgentRelationshipRoles from "./pages/AgentRelationshipRole/AgentRelationshipRole";
import AgentRelationship from "./pages/Api/agentRelationship";
import CreateEconomicEvent from "./pages/EconomicEvent/CreateEconomicEvent";
import Process from "./pages/Api/process";
import Plan from "./pages/Api/plan";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />

    <Route path="login" component={Todo} />
    <Route path="register" component={Todo} />

    <Route path="tasks" component={Todo}>
      <IndexRedirect to="my-tasks" />
      <Route path="my-tasks" component={Todo} />
      <Route path="find-tasks" component={Todo} />
    </Route>

    <Route path="projects">
        <IndexRoute component={AllProjectsPage} />
        <Route path=":id" component={SingleProjectTemplate}>
          <IndexRoute component={OverviewPage} />
          <Route path="processes" component={ProcessesPage} />
          <Route path="accounts" component={AccountsPage} />
          <Route path="members" component={MembersPage} />
          <Route path="inventory" component={InventoryPage} />
        </Route>
    </Route>

    <Route path="profile" component={Todo}>
      <IndexRoute component={Todo} />
      <Route path="my-account" component={Todo} />
      <Route path="my-skills" component={Todo} />
    </Route>

    <Route path="api">
      <Route path="processClassification" component={ProcessClassificationPage} />
      <Route path="unit" component={UnitPage} />
      <Route path="orgType" component={OrgTypePage} />
      <Route path="agent" component={AgentPage} />
      <Route path="organization" component={OrganizationPage} />
      <Route path="economicresource" component={EconomicResourcePage} />
      <Route path="economicevent" component={EconomicEvent} />
      <Route path="agentrelationshiprole" component={AgentRelationshipRoles} />
      <Route path="agentrelationship" component={AgentRelationship}/>
      <Route path="process" component={Process}/>
      <Route path="plan" component={Plan}/>
      <Route path="person" component={PersonPage} />

      <Route path="mutations">
        <Route path="createeconomicevent" component={CreateEconomicEvent} />
      </Route>
    </Route>

  </Route>
);

export default routes;
