/**
 * A This file defines common interfaces for the Orginization object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-11
 * */

import { gql } from "react-apollo";
import {agentInterface} from "../Agent/agentInterface";

export const orginazationInterface = gql`
fragment orginizationInterface on Orginization {
  ...agentInterface
}
${agentInterface}
`;

export interface OrginizationInterface {
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
