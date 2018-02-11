/**
 * This exports a React element which displays a list of all economic resources,
 * and provides a section to select a single economic resource out of that list
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-08
 */

import * as React from "react";
import "./api.css";
import getAllEconomicResources from "../../../ui-bindings/EconomicResource/getAllEconomicResources";
import {concatArray} from "./agent";
import getEconomicResourceById from "../../../ui-bindings/EconomicResource/getEconomicResourceById";

export const EconomicResource = (props) => {
  var economicResource = props.economicResource;
  return(
    <div>
      <div>Id: {economicResource.id}</div>
      <div>Resource Classification: {economicResource.resourceClassifiedAs.id}</div>
      <div>Tracking Id: {economicResource.trackingIdentifier}</div>
      <div>Image: {economicResource.image}</div>
      <div>currentQuantity: {economicResource.currentQuantity.numericValue}
        {" " + economicResource.currentQuantity.unit.name}</div>
      <div>Note: {economicResource.note}</div>
      <div>Category: {economicResource.category}</div>
      <div>Transfers: {concatArray(economicResource.transfers)}</div>
      <br/>
    </div>
  );
};

const EconomicResourceField = (props) => {
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setEconomicResource}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

export const GetSingleEconomicResource = getEconomicResourceById(({ economicResource, loading, error }) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          <EconomicResource economicResource={economicResource}/>
        </div>
      )
    )
  );
});

export const GetAllEconomicResources = getAllEconomicResources(({ economicResourceList, loading, error}) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{color: "#F00"}}>API error</p> : (
        <div>
          {economicResourceList.map( (economicResource) =>
            (<EconomicResource key={economicResource.id} economicResource={economicResource}/>)
          )}
        </div>
      )
    )
  );
});

class App extends React.Component {

  state = {
    getOneEconomicResourceId: null,
    setOneEconomicResourceId: null
  };

  // Runs every time the input field changes
  getEconomicResourceById = (event) => {
    this.setState({setOneEconomicResourceId: parseInt(event.target.value, 10)});
  };

  // Runs when "submit" is selected
  stopRefresh = (event) => {
    // Sets the value to query to the current value of the input field
    this.setState({getOneEconomicResourceId: this.state.setOneEconomicResourceId});
    event.preventDefault();
  };

  render() {
    const {getOneEconomicResourceId} = this.state;
    return (
      <div>
        <h2>Get an Economic Resource By Id: </h2>
        <br/>
        <EconomicResourceField setEconomicResource={this.getEconomicResourceById} onSubmitAction={this.stopRefresh}/>
        {
          getOneEconomicResourceId ?
          <GetSingleEconomicResource economicResourceId={getOneEconomicResourceId}/> :
          <div>Enter a value</div>
        }
        <br/>
        <h2>All Economic Resources: </h2>
        <br/>
        <GetAllEconomicResources/>
      </div>
    );
  }
}

export default App;
