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

type Promotion{
    _id: ID
    name: String!
    description: String!
    startDate: String!
    endDate: String
    createdDate: String!
}

type Token {
    token: String!
}

type Query{
    getAbout: About
    getCurrentUser: User
    getAllPromotions: [Promotion]
    getPromotion(_id:ID!): Promotion
}

type Mutation{
    addAbout (name:String!, about: String! ): About
    addPromotion (name:String!, description: String!, startDate: String, endDate:String): Promotion
    signupUser( fullname: String!, password: String!, email: String! ): Token
    signinUser( password: String!, email: String! ): Token
}
`;