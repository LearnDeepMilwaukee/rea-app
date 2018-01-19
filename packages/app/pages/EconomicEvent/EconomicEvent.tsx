import * as React from "react";
// import { allEconomicEvents, createEconomicEvent, allOrgs } from "../../../ui-bindings/EconomicEvent/EconomicEventBindings";

// import { FetchError } from "apollo-fetch";
// import queryAP from "../../../ui-bindings/agent/allOrganizations";

interface EconomicEventState {

}

interface EconomicEventProps {
  allOrgs: any
}


/**
 * Inspiration for formToJSON from https://code.lengstorf.com/get-form-values-as-json/
 */
class EconomicEvent2 extends React.Component<EconomicEventState, EconomicEventProps> {

  constructor(props: EconomicEventProps) {
    super(props);

    // this.state = {};
    // this.setState({ economicEvents: undefined});
  }

  componentDidMount() {
    console.log("It loaded");
    document.getElementById("form").addEventListener("submit", this.handleSubmit);
  }

  readonly handleSubmit = (event) => {
    event.preventDefault();

    console.log("Button Clicked");

    // let form = document.getElementById("form");
    // let data = this.formToJSON(form.elements);

    // let data = {
    //   affectedNumericValue: "4",
    //   fulfillsCommitmentId: 1,
    //   affectedUnitId: 4,
    //   affectsId: 4,
    //   outputOfId: 8,
    //   resourceImage: "Three",
    //   url: "Three",
    //   inputOfId: 2,
    //   receiverId: 8,
    //   requestDistribution: false,
    //   note: "New item for Shorewood",
    //   start: "2017-1-1",
    //   scopeId: 6,
    //   providerId: 4,
    //   createResource: true,
    //   resourceCurrentLocationId: 1,
    //   action: "take",
    //   resourceTrackingIdentifier: "Nine",
    //   affectedResourceClassifiedAsId: 8,
    //   resourceNote: "Five"
    // };

    // allOrgs()(this);

    // const queryUpdate = () => {
    //   queryAPI(allEconomicEvents).then(result => {
    //     this.setState({allEconomicEvents: result.data.viewer.allEconomicEvents});
    //   }).catch(error => console.log(error));
    // };
    //
    // // queryAPI(createEconomicEvent, data).then(() => queryUpdate()).catch(error => console.log(error));
    //
    // // queryAPI(createEconomicEvent, data).then(() => console.log("Query!!!")).catch(error => console.log("Error", error));
    // queryAPI(createEconomicEvent, data);

    // console.log("Client Data:", this.props);
  };

  // readonly formToJSON = elements => [].reduce.call(elements, (data, element) => {
  //
  //   let value = element.value;
  //
  //   if (value.toLowerCase() === "true") {
  //     value = true;
  //   } else if (value.toLowerCase() === "false") {
  //     value = false;
  //   } else if (isNaN(value) === false) {
  //     value = Number(value);
  //   }
  //
  //   if (element.name && element.value) {
  //     data[element.name] = value;
  //   }
  //   return data;
  //
  // }, {});

  render() {

    // if (this.state.allEconomicEvents === undefined) {
      //   console.log("EconomicEvent is undefined");

    if (!this.props.allOrgs) {
      return (
        <div>
          This is a form
          <form id="form">
            <input name="myInput" />
            <input type="submit" id="submit" value="Create Economic Event"/>
          </form>
        </div>
      );
    }

    //     <div>
    //
    //       <p>Orgs: {this.props}</p>
    //
    //       <form id="form">
    //         receiverId: Int,
    //         <input name="receiverId" type="text" defaultValue="8"/>
    //         <br/><br/>
    //
    //         fulfillsCommitmentId: Int,
    //         <input name="fulfillsCommitmentId" type="text" defaultValue="0"/>
    //         <br/><br/>
    //
    //         createResource: Boolean,
    //         <input name="createResource" type="text" defaultValue="true"/>
    //         <br/><br/>
    //
    //         inputOfId: Int,
    //         <input name="inputOfId" type="text" />
    //         <br/><br/>
    //
    //         url: String,
    //         <input name="url" type="text" defaultValue="http://www.msoe.edu"/>
    //         <br/><br/>
    //
    //         resourceImage: String,
    //         <input name="resourceImage" type="text" defaultValue="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"/>
    //         <br/><br/>
    //
    //         affectedUnitId: Int,
    //         <input name="affectedUnitId" type="text" />
    //         <br/><br/>
    //
    //         affectsId: Int,
    //         <input name="affectsId" type="text" />
    //         <br/><br/>
    //
    //         providerId: Int,
    //         <input name="providerId" type="text" defaultValue="8"/>
    //         <br/><br/>
    //
    //         resourceNote: String,
    //         <input name="resourceNote" type="text" defaultValue="This is a test resource"/>
    //         <br/><br/>
    //
    //         note: String,
    //         <input name="note" type="text" defaultValue="This is a test note"/>
    //         <br/><br/>
    //
    //         start: String,
    //         <input name="start" type="text" defaultValue="2017-12-20"/>
    //         <br/><br/>
    //
    //         scopeId: Int,
    //         <input name="scopeId" type="text" />
    //         <br/><br/>
    //
    //         requestDistribution: Boolean,
    //         <input name="requestDistribution" type="text" defaultValue="true"/>
    //         <br/><br/>
    //
    //         action: String,
    //         <input name="action" type="text" defaultValue="take"/>
    //         <br/><br/>
    //
    //         affectedNumericValue: String!,
    //         <input name="affectedNumericValue" type="text" defaultValue="5"/>
    //         <br/><br/>
    //
    //         outputOfId: Int,
    //         <input name="outputOfId" type="text" />
    //         <br/><br/>
    //
    //         affectedResourceClassifiedAsId: Int,
    //         <input name="affectedResourceClassifiedAsId" type="text" />
    //         <br/><br/>
    //
    //         resourceTrackingIdentifier: String
    //         <input name="resourceTrackingIdentifier" type="text" />
    //         <br/><br/>
    //
    //         resourceCurrentLocationId: Int
    //         <input name="resourceCurrentLocationId" type="text" defaultValue="1"/>
    //         <br/><br/>
    //
    //         <input type="submit" id="submit" value="Create Economic Event"/>
    //       </form>
    //     </div>
    //   )
    // }

    if (!this.state.economicEvents) {
      return (
        <h1>No Economic Events</h1>
      );
    }

    // return (
    //   <div>
    //     {this.state.economicEvent.map(agentRelationshipRole => (
    //       <AgentRelationshipRole
    //         id={agentRelationshipRole.id}
    //         label={agentRelationshipRole.label}
    //         inverseLabel={agentRelationshipRole.inverseLabel}
    //         category={agentRelationshipRole.category}
    //       />
    //     ))}
    //   </div>
    // )
  }
}

// class MyComponent extends React.Component {
//
//   constructor() {
//     super();
//   }
//
//   render() {
//     let allOrgs = this.props.allOrgs;
//
//     return (
//       <div>
//         <h1>EconomicEvent 2.0</h1>
//         {console.log("h1 log", allOrgs)}
//       </div>
//     )
//   }
// }
//
// const EconomicEvent = queryAPI(MyComponent);

export default EconomicEvent2;
