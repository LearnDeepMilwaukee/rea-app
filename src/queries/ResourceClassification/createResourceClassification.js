/**
 * Contains the query and Apollo connection to create
 * a new Economic Event
 *
 * @author Connor Hibbs <chibbs96@gmail.com>
 * @date Feb 18, 2018
 */

import {connect} from "react-redux";
import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";


export const mutation = gql`
  mutation(
    $category: String,
    $name: String!,
    $image: String,
    $note: String,
    $token: String!,
    $unit: String!
  ){
    createResourceClassification (
    category: $category,
   name: $name,
   image: $image,
    note: $note,
    token: $token,
    unit: $unit
    ) {
      resourceClassification {
        id,
        name,
        note,
        unit {
            id,
            name
        },
        image,
        category
      }
    }
  }
`;


export default compose(
    /**
     * Connect reaches out to the app data store and fetches
     * the active login token (using the current app state) and
     * injects that as the token variable in the mutation.
     */
    connect(state => ({
        token: state.getUserInfo.currentUserToken
    })),
    /**
     * The graphql function wraps the GraphQL mutation defined above
     * as an Apollo recognized mutation.
     */
    graphql(mutation,{name:"createResourceClassification"})
);
