/**
 * GraphQL Interface for a Person object
 *
 * @package REA app
 * @author Nicholas Roth <Lou3797>
 * @since 2018-2-9
 */

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { agentInterface } from "../Agent/agentInterface";

/**
 * GraphQL Query fragment for a Person
 */
export const personInterface = gql`
fragment personInterface on Person {
  ...agentInterface
}
${agentInterface}
`;

export interface Person {
  id: number
  name: string
  type: string
  image: string
  note: string
  ownedEconomicResources: [number]
  agentProcesses: [number]
  agentPlans: [number]
  agentEconomicEvents: [number]
  agentCommitments: [number]
  agentRelationships: [number]
  agentRoles: [number]
  agentRecipies: [number]
}
