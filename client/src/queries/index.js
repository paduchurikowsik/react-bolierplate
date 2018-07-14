import { gql } from 'apollo-boost';
// queries
export const GET_ABOUT = gql`
query{
    getAbout {
        _id
        name
        about
        createdDate
    }
}
`;

// mutation
export const SIGNUP_USER = gql`
mutation ($fullname: String!, $email: String!, $password: String!) {
    signupUser(fullname: $fullname, email: $email, password: $password) {
      token
    }
  }
`;