/**
 * A This file defines common interfaces for the OrganizationType object
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-04
 */

import gql from "graphql-tag";
export const orgTypeInterface = gql`
fragment orgTypeInterface on OrganizationType {
  id
  name
}`;

export interface OrganizationType {
  id: number
  name: String
}
