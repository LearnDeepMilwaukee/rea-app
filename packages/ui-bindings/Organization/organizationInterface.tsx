/**
 * A This file defines common interfaces for the Orginazation object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-11
 */

import { gql } from "react-apollo";
import { agentInterface } from "../Agent/agentInterface";

export const organizationInterface = gql`
fragment organizationInterface on Organization {
  ...agentInterface
}
${agentInterface}
`;

export interface OrganizationInterface {
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
