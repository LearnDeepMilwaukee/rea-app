/**
 * A This file defines common interfaces for the Agent object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-1-20
 */

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { EconomicResource } from "../EconomicResource/economicResourceInterface";
import { Process } from "../Process/processInterface";
import { AgentRelationship } from "../AgentRelationship/agentRelationshipInterface";
import { AgentRelationshipRole } from "../AgentRelationshipRole/AgentRelationshipRoleInterface";

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
  primaryLocation{
    latitude,
    longitude,
    address
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
    object {
      id
    }
  }
  agentRoles{
    id
  }
  agentRecipes{
    id
  }
}`;

export interface Agent {
  id: number
  name: string
  type: string
  image: string
  note: string
  ownedEconomicResources: [EconomicResource]
  agentProcesses: [Process]
  agentPlans: [any] // TODO replace with [Plan]
  agentEconomicEvents: [any] // TODO replace with [EconomicEvent]
  agentCommitments: [any] // TODO replace with [Commitment]
  agentRelationships: [AgentRelationship]
  agentRoles: [AgentRelationshipRole]
  agentRecipies: [any] // TODO replace with [ResourceClassification]
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
