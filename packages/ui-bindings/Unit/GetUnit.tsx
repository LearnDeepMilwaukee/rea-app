/**
 * A method to get a Unit
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2017-12-04
 */

import { connect } from 'react-redux'
import { gql, graphql, compose } from 'react-apollo'

import { AppState } from '@vflows/store/types'
import { getActiveLoginToken } from '@vflows/store/selectors/auth'

export const Unit = gql`
fragment coreAgentFields on Agent {
  id
  name
  symbol
}`


const query = gql`
query($token: String, $agentId: Int) {
  viewer(token: $token) {
    agent(id: $agentId) {
      ...coreAgentFields
      agentRelationships {

        subject {
          name
          type
          id
          image
        }
        relationship {
          label
          category
        }
        object {
          name
          type
          image
          id
        }
      }
      ...coreEventsFields
      agentProcesses(isFinished: false) {
        # :TODO: use fragment for this
        id
        name
        isStarted
        plannedStart
        plannedDuration
        isFinished
        note
        unplannedEconomicEvents {
          action
        }
        processEconomicEvents {
          action
        }
        processCommitments {
          action
        }
        inputs {
          action
        }
        outputs {
          action
        }
        workingAgents {
          id
          name
          image
        }
      }
      ownedEconomicResources {
        resourceClassifiedAs {
          name
          category
        }
        trackingIdentifier
        currentQuantity {
          numericValue
          unit {
            name
          }
        }
        image
        note
        category
      }
    }
  }
}
${Unit}
`

interface Unit {
  id: number
  name: String
  symbol: String
}

export default compose(
  // bind input data from the store
  connect((state: AppState) => ({
    variables: {
      token: getActiveLoginToken(state),
    },
  })),
  graphql(query, {
    // read query vars into query from input data above
    options: (props) => ({ variables: {
        ...props.variables,
        agentId: props.agentId,
      } }),
    // transform output data
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading,
      error,
      refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
      agent: viewer ? viewer.agent : null,
    }),
  })
)
