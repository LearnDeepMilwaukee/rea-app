/**
 * Public version of the site template, for pages that do not require being logged in
 *
 * @author:  Connor <hibbscm@msoe.edu>
 */

import * as React from "react";
import { Component, ReactElement } from "react";

import AuthenticatedOnly from "@vflows/bindings/AuthenticatedOnly";
import { withRouter } from "react-router-dom";

// import { Layout, NavDrawer, Panel } from '@vflows/views/templates/Layout'

import Header from "@vflows/views/organisms/Header";
import Aside from "@vflows/views/organisms/Aside";
import Sidebar from "@vflows/views/organisms/Sidebar";
import SecondaryMenu from "@vflows/views/organisms/SecondaryMenu";

import Overview from "@vflows/views/organisms/Overview";
import Members from "@vflows/views/organisms/Members";
import List from "@vflows/views/organisms/List";

import * as _ from "underscore";
import { matchPath } from "react-router";

import LoginPage from "../../pages/Login";
import Contributions from "../../pages/Contributions";
const styles = require("./siteTemplate.css");

export interface Props {
  children?: ReactElement<any>,
}

interface State {
}

class SiteTemplate extends Component<Props, State> {
  state = {};

  renderSite() {
    let classname = styles["medium-9"] + " " + styles.columns;

    console.log("Rendering a public page");

    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSite()}
      </div>
    );
  }
}

export default SiteTemplate;
