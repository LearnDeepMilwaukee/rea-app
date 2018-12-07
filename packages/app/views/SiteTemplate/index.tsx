/**
 * Main site template- toplevel container for app area, side panels, header / footer etc
 *
 * @package: OCP app
 * @author:  pospi <pospi@spadgos.com>
 * @since:   2017-03-19
 */

import * as React from "react";
import { Component, ReactElement } from "react";

import AuthenticatedOnly from "@vflows/bindings/AuthenticatedOnly";
import { withRouter } from "react-router-dom";

import { Layout, NavDrawer, Panel } from '@vflows/views/templates/Layout'

import Header from "@vflows/views/organisms/Header";


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

  readonly authenticationExemptURLs = [
    "register/individual"
  ];

  publicSite() {
    console.log("Rendering a private page");

    let pathExempt = false;
    let targetURL = this.props.children.props.location.pathname;
    _.each(this.authenticationExemptURLs, (URL) => {
      if (URL === targetURL) {
        pathExempt = true;
      }
    });

    console.log("This path is", (pathExempt ? "exempt" : "authenticated"))
    return pathExempt;
  }

  renderSite() {
    return (
        <div>
          <Header/>
          {this.props.children}
        </div>
      );
    }


  render() {
    // if(this.publicSite()){
    //   return(
    //     <div>
    //       {this.renderSite()}
    //     </div>
    //   )
    // }
    // else {
      return (
        <AuthenticatedOnly unauthenticatedComponent={<LoginPage/>}>
          {this.renderSite()}
        </AuthenticatedOnly>
      );
    }
  // }
}

export default SiteTemplate;
