import {gql} from 'apollo-boost';


const createUserMutation = gql`
    mutation(
        $username: String!
        $email: GraphQLEmail!
        $password: String!
        $type: UserType
        ) {
            createUser(
                username: $username
                email: $email
                password: $password
                type: $type) {
                    id
                    fullName
                    }
    }
`;

const loginUserMutation = gql`
    query (
    $email: GraphQLEmail!
    $password: String!
    )
         {
            login(
                email: $email
                password: $password
                ) {
                    loginSuccess
                    token
                    user {
                        type
                        }
                  }
            }
`;

const queryMe = gql`
    query {
        me {
            id
            username
            firstName
            lastName
            fullName
            type
            email
            avatarUrl  
        }
    }
`;

const queryMyFarms = gql`
    {
        me {
            id
            farms {
                id
                name
                address
                photos {
                    url
        }
    }
  }
}
`;

export {loginUserMutation, createUserMutation, queryMe, queryMyFarms}
