import * as React from "react";

import allEconomicEvents from "../../../ui-bindings/EconomicEvent/AllEconomicEvents";
import economicEventById from "../../../ui-bindings/EconomicEvent/EconomicEventById";

/**
 * Main component for the page
 */
class EconomicEvent extends React.Component {

  state = {
    eventId: 57
  };

  handleClick = (event) => {
    event.preventDefault();

    let eventId = document.getElementById("idForm").value;
    console.log("Setting the state to", eventId);

    console.log("Is this null?", this);
    this.setState({eventId: eventId});
    console.log("State is", this.state);
  };

  render() {
    return (
      <div>
        <h1>Economic Events</h1>

        <h3>Search by ID:</h3>
        <form onSubmit={this.handleClick}>
          <input type="text" id="idForm" defaultValue="57"/>
        </form>

        <h4>Results</h4>
        ======================================================<br/>
        <EconomicEventById eventId={this.state.eventId} />
        ======================================================<br/>

        <h3>All Economic Events</h3>
        <EconomicEventList />
      </div>
    );
  }
}

/**
 * Binds to the database passing in any variables defined in props. Then maps
 * the response from the database to a component that can be rendered on the screen
 */
const EconomicEventById = economicEventById( ({economicEvent, loading, error}) => {
  if (loading) {
    return <h3>Loading...</h3>
  } else if (error) {
    return <h3>Error!</h3>
  }

  return <SingleEconomicEvent economicEvent={economicEvent} />
});

/**
 * A single economic event being drawn on the screen
 * @param props
 * @returns {any}
 * @constructor
 */
const SingleEconomicEvent = (props) => {
  let economicEvent = props.economicEvent;
  return (
    <div>
      ID: {economicEvent.id} <br />
      Notes: {economicEvent.note} <br/>
    </div>
  );
};

// class SingleEconomicEvent extends React.Component {
//   constructor(private props) {
//     super(props);
//
//     economicEventById ( ()
//
//     )
//   }
// }


//   (props) => {
//   let economicEvent = props.economicEvent;
//
//   return (
//     <div>
//       <p>Economic Event # {economicEvent.id}</p>
//       <p>Note: {economicEvent.note}</p>
//     </div>
//   );
// };



// class EconomicEventList extends React.Component<any, any> {
//
//   render() {
//
//     if (this.props.loading) {
//       return <h2>Loading Economic Events...</h2>
//     } else if (this.props.error) {
//       return <h2>Error!</h2>
//     }
//
//     return (
//       <div>
//         List goes here
//         {
//           this.props.economicEvents.map(economicEvent => (
//             <SingleEconomicEvent economicEvent={economicEvent} />
//           ))
//         }
//       </div>
//     );
//   }
// }

/**
 * Binds to the database to get all economic events. Then maps
 * the response from the database to a component that can be rendered on the screen
 */
const EconomicEventList = allEconomicEvents( ({economicEvents, loading, error}) => {
  if (loading) {
    return <h2>Loading...</h2>
  } else if (error) {
    return <h2>Error!</h2>
  }

  return (
    <div>
      {
        economicEvents.map(economicEvent => (
          <div>
            ======================================================<br/>
            <SingleEconomicEvent economicEvent={economicEvent} />
            ======================================================<br/>
          </div>
        ))
      }
    </div>
  );
});

export default EconomicEvent;

/**
 * Binds to the GraphQL database, using the EconomicEventBindings API collection
 * to form the query needed. Results are returned as (data, loading, error)
 * indicating if anything went wrong with the query. Data is then rendered with
 * the React Component when the data is ready.
 */
// export default allEconomicEvents( ({economicEvents, loading, error}) => {
//   if (loading) {
//     console.log("Loading");
//     return <h1>Loading...</h1>;
//   } else if (error) {
//     console.log("Error");
//     return <h1>Error</h1>;
//   } else if (economicEvents) {
//     console.log("Economic Events", economicEvents);
//     return (
//       <div>
//         <EconomicEvent economicEvents={economicEvents}/>
//       </div>
//     );
//   } else {
//     console.log("Economic Events was undefined");
//     return <h1>Loading...</h1>
//   }
// });

/*

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

        <div>
          <form onSubmit={this.stopRefresh}>
            Enter an Id: <input type="text" name="value" onChange={this.getUnitById}/>
            <input type="submit" value="query"/>
          </form>
        </div>

        {getOneUnitId ? <GetSingleUnit unitId={getOneUnitId}/> : <div>Enter a value</div>}
      </div>
    );
  }
}

export default app;
 */
