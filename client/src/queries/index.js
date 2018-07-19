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
export const GET_ALL_PROMOTIONS = gql`
query{
  getAllPromotions {
        _id
        name
        description
        startDate
        endDate
    }
}
`;


export const GET_PROMOTION = gql`
query($_id:ID!){
  getPromotion(_id:$_id) {
        _id
        name
        description
        startDate
        endDate
    }
}
`;

export const GET_CURRENT_USER = gql`
query{
  getCurrentUser {
      fullname
      email
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

export const SIGNIN_USER = gql`
mutation ($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;

