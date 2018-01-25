/**
 * A This file defines common interfaces for the Unit object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-12-04
 */

import { gql } from "react-apollo";

export const agentInterface = gql`
fragment agentInterface on Agent {
  id
  name
  type
  image
  note
  ownedEconomicResources{
    id
  }
  agentProcesses{
    id
  }
  agentPlans{
    id
  }
  agentEconomicEvents{
    id
  }
  agentCommitments{
    id
  }
  agentRelationships{
    id 
  }
  agentRoles{
    id
  }
  agentRecipes{
    id
  }
}`;

export interface Agent {
  id: number,
  name: string,
  type: string,
  image: string,
  note: string,
  ownedEconomicResources: [number],
  agentProcesses: [number],
  agentPlans: [number],
  agentEconomicEvents: [number],
  agentCommitments: [number],
  agentRelationships: [number],
  agentRoles: [number],
  agentRecipies: [number]
}

export interface AgentType {
  id: number,
  note: string,
  image: string,
  agentProcesses?: Array<{
    id: number,
    name: string,
  }>,
  ownedEconomicResources?: Array<{
    id: number,
    resourceType: string,
  }>,
  economicEvents?: Array<Events>
  members?: Array<AgentType>,
}

export interface Events {
  id: number
  action: string
  start: string
  numericValue: number
  unit: string
  note: string
  workCategory: string
  affectedResource: Object
  provider: Object
  receiver: Object
  process: Object
}
