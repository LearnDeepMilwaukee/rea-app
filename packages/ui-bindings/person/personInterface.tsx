/**
 * GraphQL Interface for a Person object
 *
 * @package REA app
 * @author Nicholas Roth
 * @since 2018-2-9
 */

import { gql } from "react-apollo";
import { agentInterface } from "../Agent/agentInterface";

/**
 * GraphQL Query fragment for a Person
 */
export const personInterface = gql`
fragment organizationInterface on Organization {
  ...agentInterface
}
${agentInterface}
`;

export interface Person {
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
