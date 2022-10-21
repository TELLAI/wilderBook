import { gql } from "@apollo/client";


export const UPDATE_UPVOTES = gql`
  mutation UpdateUpvote(
    $voteId: ID!
    $votes: Float!
    $wilder: String!
    $skill: String!
  ) {
    updateUpvote(
      voteId: $voteId
      votes: $votes
      wilder: $wilder
      skill: $skill
    ) {
      votes
      id
    }
  }
`;