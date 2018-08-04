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
        createdDate
    }
}
`;

export const GET_CURRENT_USER = gql`
query{
  getCurrentUser {
      fullname
      email
      roles {
        _id
        name
      }
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

export const ADD_PROMOTION = gql`
mutation ($name:String!, $description: String!, $startDate: String, $endDate:String) {
  addPromotion(name: $name, description: $description, startDate:$startDate, endDate:$endDate) {
      _id
      name
      description
      startDate
      endDate
      createdDate
    }
  }
`;

export const ADD_ABOUT = gql`
mutation ($name:String!, $about: String!) {
    addAbout ( name:$name, about: $about ) {
      _id
      name
      about
      createdDate
    }
  }
`;


export const DELETE_PROMOTION = gql`
mutation ($_id:ID!) {
  deletePromotion ( _id:$_id ) {
    _id
    name
    description
    startDate
    endDate
    createdDate
    }
  }
`;

