/**
 * GraphQL Interface for a Person object
 *
 * @package REA app
 * @author Nicholas Roth
 * @since 2018-2-9
 */

import { gql } from "react-apollo";

/**
 * GraphQL Query fragment for a Person
 */
export const processClassificationInterface = gql`
fragment processClassificationInterface on ProcessClassification {
  id
  name
  type
  image
  note
  ownedEconomicResources
  agentProcesses
  agentPlan
  agentEconomicEvents
  agentCommitments
  agentRelationships
  agentRoles
  agentRecipes
}`;

/**
 * Object type specifications
 */
export interface ProcessClassification {
  id: number
  name: String
  note: String
  ownedEconomicResources: String
  agentProcesses: String
  agentPlan: String
  agentEconomicEvents: String
  agentCommitments: String
  agentRelationships: String
  agentRoles: String
  agentRecipes: String
}
