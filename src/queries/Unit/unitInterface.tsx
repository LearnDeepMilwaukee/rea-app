/**
 * A This file defines common interfaces for the Unit object
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-12-04
 */

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
export const unitInterface = gql`
fragment unitInterface on Unit {
  id
  name
  symbol
}`;

export interface Unit {
  id: number
  name: string
  symbol: string
}
