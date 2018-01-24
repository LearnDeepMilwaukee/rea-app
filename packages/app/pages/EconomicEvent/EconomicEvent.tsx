import * as React from "react";

import allEconomicEvents from "../../../ui-bindings/EconomicEvent/AllEconomicEvents";
import economicEventById from "../../../ui-bindings/EconomicEvent/EconomicEventById";

interface EconomicEventState {
  eventId: number
}

interface EconomicEventProps {
  economicEvents: Object
}

/**
 * Main component for the page
 */
class EconomicEvent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      eventId: 57
    };
  }

  handleClick(event) {
    event.preventDefault();

    let eventId = document.getElementById("idForm").value;

    console.log("Input was", event.target.value);

    console.log("Button Clicked Event:", eventId);

    this.setState({eventId});
  }

  render() {
    return (
      <div>

        Search by ID:
        <form onSubmit={this.handleClick}>
          <input type="text" id="idForm" defaultValue="57"/>
        </form>

        {/*<SingleEconomicEvent id={this.state.eventId}/>*/}
        {/*{economicEventById( {id: this.state.eventId} )(SingleEconomicEvent)}*/}

        <EconomicEventById eventId={57} />

        <EconomicEventList />
      </div>
    );
  }
}

/**
 * Single EconomicEvent component used to map returned results to
 * output on the screen
 */
const EconomicEventById = economicEventById( ({economicEvent, loading, error}) => {

  console.log("Initial Data:", economicEvent, loading, error);

  if (loading) {
    return <h3>Loading...</h3>
  } else if (error) {
    return <h3>Error!</h3>
  }

  if (!economicEvent) {
    console.log("economicEvent wasn't defined");
    console.log("Declined Data:", economicEvent, loading, error);
    return <div>Nope</div>
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
      ====================================<br/>
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

const EconomicEventList = allEconomicEvents( ({economicEvents, loading, error}) => {
  if (loading) {
    return <h2>Loading...</h2>
  } else if (error) {
    return <h2>Error!</h2>
  }

  return (
    <div>
      List goes here
      {
        economicEvents.map(economicEvent => (
          <SingleEconomicEvent economicEvent={economicEvent} />
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
