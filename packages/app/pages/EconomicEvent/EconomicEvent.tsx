import * as React from "react";
// import { allEconomicEvents, createEconomicEvent, allOrgs } from "../../../ui-bindings/EconomicEvent/EconomicEventBindings";

import allEconomicEvents from "../../../ui-bindings/EconomicEvent/AllEconomicEvents";
import _EconomicEvent from "../../../ui-bindings/EconomicEvent/EconomicEvent.tsx";

interface EconomicEventState {

}

interface EconomicEventProps {
  economicEvents: Object
}

/**
 * Inspiration for formToJSON from https://code.lengstorf.com/get-form-values-as-json/
 */
// class EconomicEvent2 extends React.Component {
//
//   constructor(props: EconomicEventProps) {
//     super(props);
//   }
//
//   componentDidMount() {
//     console.log("It loaded");
//     document.getElementById("form").addEventListener("submit", this.handleSubmit);
//   }
//
//   readonly handleSubmit = (event) => {
//     event.preventDefault();
//
//     console.log("Button Clicked");
//
//     // let form = document.getElementById("form");
//     // let data = this.formToJSON(form.elements);
//
//     let data = {
//       affectedNumericValue: "4",
//       fulfillsCommitmentId: 1,
//       affectedUnitId: 4,
//       affectsId: 4,
//       outputOfId: 8,
//       resourceImage: "Three",
//       url: "Three",
//       inputOfId: 2,
//       receiverId: 8,
//       requestDistribution: false,
//       note: "New item for Shorewood",
//       start: "2017-1-1",
//       scopeId: 6,
//       providerId: 4,
//       createResource: true,
//       resourceCurrentLocationId: 1,
//       action: "take",
//       resourceTrackingIdentifier: "Nine",
//       affectedResourceClassifiedAsId: 8,
//       resourceNote: "Five"
//     };
//
//   };
//
//   // readonly formToJSON = elements => [].reduce.call(elements, (data, element) => {
//   //
//   //   let value = element.value;
//   //
//   //   if (value.toLowerCase() === "true") {
//   //     value = true;
//   //   } else if (value.toLowerCase() === "false") {
//   //     value = false;
//   //   } else if (isNaN(value) === false) {
//   //     value = Number(value);
//   //   }
//   //
//   //   if (element.name && element.value) {
//   //     data[element.name] = value;
//   //   }
//   //   return data;
//   //
//   // }, {});
//
//   render() {
//
//     if (!this.props.allOrgs) {
//       return (
//         <div>
//           This is a form
//           <form id="form">
//             <input name="myInput" />
//             <input type="submit" id="submit" value="Create Economic Event"/>
//           </form>
//           {console.log("Props", this.props)}
//         </div>
//       );
//     }
//
//     //     <div>
//     //
//     //       <p>Orgs: {this.props}</p>
//     //
//     //       <form id="form">
//     //         receiverId: Int,
//     //         <input name="receiverId" type="text" defaultValue="8"/>
//     //         <br/><br/>
//     //
//     //         fulfillsCommitmentId: Int,
//     //         <input name="fulfillsCommitmentId" type="text" defaultValue="0"/>
//     //         <br/><br/>
//     //
//     //         createResource: Boolean,
//     //         <input name="createResource" type="text" defaultValue="true"/>
//     //         <br/><br/>
//     //
//     //         inputOfId: Int,
//     //         <input name="inputOfId" type="text" />
//     //         <br/><br/>
//     //
//     //         url: String,
//     //         <input name="url" type="text" defaultValue="http://www.msoe.edu"/>
//     //         <br/><br/>
//     //
//     //         resourceImage: String,
//     //         <input name="resourceImage" type="text" defaultValue="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"/>
//     //         <br/><br/>
//     //
//     //         affectedUnitId: Int,
//     //         <input name="affectedUnitId" type="text" />
//     //         <br/><br/>
//     //
//     //         affectsId: Int,
//     //         <input name="affectsId" type="text" />
//     //         <br/><br/>
//     //
//     //         providerId: Int,
//     //         <input name="providerId" type="text" defaultValue="8"/>
//     //         <br/><br/>
//     //
//     //         resourceNote: String,
//     //         <input name="resourceNote" type="text" defaultValue="This is a test resource"/>
//     //         <br/><br/>
//     //
//     //         note: String,
//     //         <input name="note" type="text" defaultValue="This is a test note"/>
//     //         <br/><br/>
//     //
//     //         start: String,
//     //         <input name="start" type="text" defaultValue="2017-12-20"/>
//     //         <br/><br/>
//     //
//     //         scopeId: Int,
//     //         <input name="scopeId" type="text" />
//     //         <br/><br/>
//     //
//     //         requestDistribution: Boolean,
//     //         <input name="requestDistribution" type="text" defaultValue="true"/>
//     //         <br/><br/>
//     //
//     //         action: String,
//     //         <input name="action" type="text" defaultValue="take"/>
//     //         <br/><br/>
//     //
//     //         affectedNumericValue: String!,
//     //         <input name="affectedNumericValue" type="text" defaultValue="5"/>
//     //         <br/><br/>
//     //
//     //         outputOfId: Int,
//     //         <input name="outputOfId" type="text" />
//     //         <br/><br/>
//     //
//     //         affectedResourceClassifiedAsId: Int,
//     //         <input name="affectedResourceClassifiedAsId" type="text" />
//     //         <br/><br/>
//     //
//     //         resourceTrackingIdentifier: String
//     //         <input name="resourceTrackingIdentifier" type="text" />
//     //         <br/><br/>
//     //
//     //         resourceCurrentLocationId: Int
//     //         <input name="resourceCurrentLocationId" type="text" defaultValue="1"/>
//     //         <br/><br/>
//     //
//     //         <input type="submit" id="submit" value="Create Economic Event"/>
//     //       </form>
//     //     </div>
//     //   )
//     // }
//   }
// }

/**
 * Single EconomicEvent component used to map returned results to
 * output on the screen
 */
const SingleEconomicEvent = (props) => {
  let economicEvent = props.economicEvent;

  return (
    <div>
      <p>Economic Event # {economicEvent.id}</p>
      <p>Note: {economicEvent.note}</p>
    </div>
  );
};

// EconomicEvent #{economicEvent.id}
// {console.log("#", economicEvent.id, economicEvent)}

class EconomicEvent extends React.Component<EconomicEventProps, any> {

  render() {
    return (
      <div>
        {
          this.props.economicEvents.map(economicEvent => (
            <SingleEconomicEvent economicEvent={economicEvent} />
          ))
        }
      </div>
    );
  }
}

/**
 * Binds to the GraphQL database, using the EconomicEventBindings API collection
 * to form the query needed. Results are returned as (data, loading, error)
 * indicating if anything went wrong with the query. Data is then rendered with
 * the React Component when the data is ready.
 */
export default allEconomicEvents( ({economicEvents, loading, error}) => {
  if (loading) {
    console.log("Loading");
    return <h1>Loading...</h1>;
  } else if (error) {
    console.log("Error");
    return <h1>Error</h1>;
  } else if (economicEvents) {
    console.log("Economic Events", economicEvents);
    return (
      <div>
        <EconomicEvent economicEvents={economicEvents}/>
      </div>
    );
  } else {
    console.log("Economic Events was undefined");
    return <h1>Loading...</h1>
  }
});


/*

 * This exports a React element which displays a list o all units,
 * and provides a section to select a single unit out of that list
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-01-18



const UnitField = (props) =>{
  return(
    <div>
      <form onSubmit={props.onSubmitAction}>
        Enter an Id: <input type="text" name="value" onChange={props.setUnit}/>
        <input type="submit" value="query"/>
      </form>
    </div>
  );
};

class app extends React.Component{

  state = {
    getOneUnitId: null,
    setOneUnitId: null
  };

  //Runs every time the input field changes
  getUnitById = (event) => {
    this.setState({setOneUnitId: parseInt(event.target.value)});
  };

  //Runs when "submit" is selected
  stopRefresh = (event) => {
    //Sets the value to query to the current value of the input field
    this.setState({getOneUnitId: this.state.setOneUnitId});
    event.preventDefault();
  };

  render(){
    const {getOneUnitId} = this.state;
    return (
      <div>
        <h2>List of all units: </h2>
        <br/>
        <UnitList/>
        <br/>
        <h2>Get Unit by Id: </h2>
        <br/>
        <UnitField setUnit={this.getUnitById} onSubmitAction={this.stopRefresh}/>
        {getOneUnitId ? <GetSingleUnit unitId={getOneUnitId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default app;
 */
