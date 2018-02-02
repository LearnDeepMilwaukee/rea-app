/**
 * A This file defines common interfaces for the AgentRelationship object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-02-02
 */

import { gql } from "react-apollo";
import {Agent} from "../Agent/agentInterface";

export const AgentRelationshipInterface = gql`
fragment agentRelationshipInterface on AgentRelationship {
  id
  subject{
    id
  }
  object{
    id
  }
  relationship{
    id
  }
}`;

export interface AgentRelationship {
  id: number
  name: Agent
  symbol: Agent
  relationship: Agent
}
