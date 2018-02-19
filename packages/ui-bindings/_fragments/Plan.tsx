/**
 * Query fragments for Economic Agents
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2019-02-19
 */

import { gql } from "react-apollo"

export const coreCommitmentFields = gql`
fragment coreCommitmentFields on Commitment {
  action
  plannedStart
  committedOn
  due
  note
  isFinished

  fulfilledBy {
    fulfilledBy {
      action
      start
      provider {
        name
      }
      affectedQuantity {
        numericValue
        unit {
          name
        }
      }
    }
  }

  resourceClassifiedAs {
    name
    category
  }
  provider {
    id
    name
    image
  }
  receiver {
    id
    name
  }
  scope {
    id
    name
  }
}`;

export const coreEventFields = gql`
fragment coreEventFields on EconomicEvent {
  action
  start
  note
  affectedQuantity {
    numericValue
    unit {
      name
    }
  }
  fulfills {
    fulfills {
      action
      provider {
        name
      }
      committedQuantity {
        numericValue
        unit {
          name
        }
      }
    }
  }
  affects {
    resourceClassifiedAs {
      name
      category
    }
    trackingIdentifier
  }
  provider {
    id
    name
    image
  }
  receiver {
    id
    name
  }
}`;
