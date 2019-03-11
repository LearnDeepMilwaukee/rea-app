/**
 * A method to get all OrganizationTypes
 *
 * @package: REA app
 * @author:  Ryan Guinn <guinnrd@msoe.edu>
 * @since:   2018-02-04
 */

import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";


// import { orgTypeInterface } from "../interfaces/orgTypeInterface";

const query = gql`
query($token: String) {
  viewer(token: $token) {
    organizationTypes{
      ...orgTypeInterface
    }
  }
}
`;


export default compose(
    graphql(query, {
        // read query vars into query from input data above
        options: (props) => ({
            variables: {
                token: props.token,
            }
        }),
        // transform output data
        props: ({ownProps, data: {viewer, loading, error, refetch}}) => (
            {
                loading,
                error,
                refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
                organizationList: viewer ? viewer.allOrganizations : null,
            }),
    })
);