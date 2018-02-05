/**
 * The interface for a ProcessClassification
 * @author:
 * @since:
 */

import { gql } from "react-apollo";

/**
 * GraphQL Query fragment for a ProcessClassification
 */
export const processClassificationInterface = gql`
fragment processClassificationInterface on ProcessClassification {
  id
  name
  note
  scope {
    id
  }
  estimatedDuration
}`;

export interface ProcessClassification {
  id: number
  name: String
  note: String
  scope: Object
  estimatedDuration: String
}
