import * as React from "react";
import queryAPI from "../../../ui-bindings/AgentSandbox/AgentSandboxBindings";
import BindAgentRelationship from "../../../ui-bindings/AgentSandbox/AgentRelationship";

import { FetchError } from "apollo-fetch";

const AgentRelationshipRole = (props) => {
  return(
    <div>
      <div>
        <p>id: {props.id}</p>
        <p>label: {props.name}</p>
        <p>inverseLabel: {props.symbol}</p>
        <p>category: {props.category}</p>
        <br/>
      </div>
    </div>
  )
};

const AgentRelationship = (props) => {
  return (
    <div>
      <p>id: {props.id}</p>
      <AgentRelationshipRole props={props}/>
    </div>
  )
};

let myPromise = queryAPI();

// const AgentRelationshipRoleList = myPromise.then(result => {
//   console.log(result);
//   return (
//     <div>
//       <p>result</p>
//     </div>
  //   loading ? <strong>Loading...</strong> : (
  //     error ? <p style={{ color: "#F00" }}>API error</p> : (
  //       <div >
  //         <div>
  //           {roles.map( (arr) => (
  //             <AgentRelationshipRole
  //               id={roles.id}
  //               label={roles.label}
  //               inverseLabel={roles.inverseLabel}
  //               category={roles.category}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     )
  //   )
//   );
// });

class AgentRelationshipRoles extends React.Component {

  constructor(private props) {
    this.state = {};

    queryAPI().then(result => {

      let {data, error, extensions} = result;
      console.log("Received result from API!");
      console.log("Data:", data);
      console.log("Error:", error);
      console.log("Extensions:", extensions);
      this.setState(result);
    }).catch((error: FetchError) => {
      console.log("Promise Error:", error);
      console.log(error.resonse);
      console.log(error.parseError);
    });
  }

  render() {
    if (!this.state.result) {
      return <p>Loading...</p>
    }
    return (
      <div>
        <p>It loaded!</p>
        {console.log(this.state.result)}
      </div>
    )
  }
}

/*
const AgentRelationshipRoleList = BindAgent(({roles, loading, error}: Props) => {
  return (
    loading ? <strong>Loading...</strong> : (
      error ? <p style={{ color: "#F00" }}>API error</p> : (
        <div >
          <div>
            {roles.map( (arr) => (
              <AgentRelationshipRole
                id={roles.id}
                label={roles.label}
                inverseLabel={roles.inverseLabel}
                category={roles.category}
              />
            ))}
          </div>
        </div>
      )
    )
  );
});
*/

// const AgentRelationshipList = BindAgentRelationship(({agentRelationships, loading, error}: Props) => {
//   return (
//     loading ? <strong>Loading...</strong> : (
//       error ? <p style={{ color: "#F00" }}>API error</p> : (
//         <div >
//           <div>
//             {console.log("AgentRelationships:", agentRelationships)}
//             {/*{roles.map( (arr) => (*/}
//               <AgentRelationship
//                 id={agentRelationships.id}
//                 props={agentRelationships}
//               />
//               // ))}
//           </div>
//         </div>
//       )
//     )
//   );
// });

class AgentSandbox extends React.Component {
  constructor(private props) {
    super (props);
  }

  render() {
    return (
      <div>
        <p>AgentRelationshipRole</p>
        <AgentRelationshipRoles />
        <br />

        {/*<p>AgentRelationship</p>*/}
        {/*<AgentRelationshipList />*/}
      </div>
    )
  }
}

export default AgentSandbox;
