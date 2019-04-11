import {gql} from 'apollo-boost';


const createUserMutation = gql`
    mutation(
        $firstName: String!
        $email: GraphQLEmail!
        $password: String!
        $type: UserType
        ) {
            createUser(
                firstName: $firstName
                email: $email
                password: $password
                type: $type) {
                    id
                    fullName
                    }
    }
`;

export {createUserMutation}