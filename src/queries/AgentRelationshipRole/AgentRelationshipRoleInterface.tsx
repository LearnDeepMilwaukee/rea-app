/**
 * A This file defines common interfaces for the AgentRelationshipRole object
 *
 * @package: REA app
 * @author:  Connor Hibbs <chibbs96@gmail.com>
 * @since:   2018-1-28
 */

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
export default gql`
fragment agentRelationshipRole on AgentRelationshipRole {
  id
  label
  inverseLabel
  category
}`;

export interface AgentRelationshipRole {
  id: number
  label: string
  inverseLabel: string
  category: string // AgentRelationshipCategory
}
