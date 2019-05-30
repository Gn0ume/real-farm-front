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
            fullName
            type
            email
            avatarUrl  
            avatar {
                metaData
                url
                preview {
                    url
                }
            }
        }
    }
`;

const queryClearAvatar = gql`
    query {
        me {
            id
            clearAvatar 
        }
    }
`;

const queryMyProfile = gql`
    query {
          me {
            id
            firstName
            lastName
            avatarUrl
            aboutMe
            avatarCropSettings
            gender
            type
            email
            avatar {
                metaData
                url
                preview {
                    url
                }
            }
          }
 }
`;

const queryUpdateMyProfile = gql`
    query(
        $aboutMe: String
        $firstName: String
        $lastName: String
        $gender: UserGender
        $type: UserType
        $avatarCropSettings: [Float]
        ){
            me {
                id
                update (
                aboutMe: $aboutMe
                firstName: $firstName
                lastName: $lastName
                gender: $gender
                type: $type
                avatarCropSettings: $avatarCropSettings
                ) {
                    id
                    fullName
                    username
                    avatarUrl
                    avatar {
                metaData
                url
                preview {
                    url
                }
            }
                    }
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

export {
    loginUserMutation,
    createUserMutation,
    queryMe,
    queryMyProfile,
    queryUpdateMyProfile,
    queryMyFarms,
    queryClearAvatar
}
