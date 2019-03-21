
/**
 * A This file defines common interfaces for the Economic Event object
 *
 * @package: REA app
 * @author:  Connor Hibbs <chibbs96@gmail.com>
 * @since:   2018-1-28
 */

import gql from "graphql-tag";
// The commented out elements lead to errors in the query. They are non-nullable values
// and some of the elements were missing the values

export default gql`
fragment economicEventInterface on EconomicEvent {
  id
  action
  inputOf {
    id
  }
  outputOf {
    id
  }
  provider {
    id
  }
  receiver {
    id
  }
  scope {
    id
  }
#  affects {
#    id
#  }
  affectedQuantity {
    numericValue
    unit {
      id
      name
      symbol
    }
  }
  start
  url
  requestDistribution
  note
#  fulfills {
#    id
#  }
  userIsAuthorizedToUpdate
  userIsAuthorizedToDelete
}`;
