/**
 * A This file defines common interfaces for the Orginazation object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2018-02-11
 */

import { gql } from "react-apollo";
import {Agent, agentInterface} from "../Agent/agentInterface";

export const organizationInterface = gql`
fragment organizationInterface on Organization {
  ...agentInterface
}
${agentInterface}
`;

export interface Organization extends Agent {

}
