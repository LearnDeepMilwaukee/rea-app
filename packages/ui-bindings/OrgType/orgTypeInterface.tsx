/**
 * A This file defines common interfaces for the OrgType object
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-04
 */

import { gql } from "react-apollo";

export const orgTypeInterface = gql`
fragment orgTypeInterface on OrgType {
  id
  name
}`;

export interface OrgType {
  id: number
  name: String
}
