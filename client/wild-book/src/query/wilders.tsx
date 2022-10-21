import { gql } from "@apollo/client";

export const GET_WILDERS = gql`
  query GetWilders {
    getWilders {
      id
      name
      upvotes {
        votes
        skill {
          name
        }
      }
    }
  }
`;

export const CREATED_WILDER = gql`
  mutation CreateWilder($name: String!) {
    createWilder(name: $name) {
      name
    }
  }
`;