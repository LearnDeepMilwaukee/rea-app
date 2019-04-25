import {connect} from "react-redux";
import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";


export const mutation = gql`
  mutation(
    $symbol: String,
    $name: String!,
    $token: String! 
  ){
    createUnit (
    
   name: $name,
    token: $token,
    symbol: $symbol
    ) {
      unit {
        
            id,
            name
       
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
    graphql(mutation, {name: "createUnit"})
);
