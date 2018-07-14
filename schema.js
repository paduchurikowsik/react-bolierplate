exports.typeDefs = `
type User{
    _id: ID
    fullname: String!
    password: String!
    email: String! @unique
    joinedDate: String
    roles: [Role]
}
type Role{
    _id: ID
    name: String!
}
type About{
    _id: ID
    name: String!
    about: String!
    createdDate: String!
}

type Token {
    token: String!
}

type Query{
    getAbout: About
}

type Mutation{
    addAbout (name:String!, about: String! ): About
    signupUser( fullname: String!, password: String!, email: String! ): Token
}
`;