import { gql } from 'apollo-boost';

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