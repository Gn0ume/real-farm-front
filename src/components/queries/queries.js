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
                    preview{
                        url
                    }
        }
    }
  }
}
`;

// const queryAboutMyFarm = gql`
//     {
//   me {
//     id
//     farms {
//       id
//       name
//       address
//       photos {
//         id
//         name
//         metaData
//         url
//         preview {
//         url
//         }
//       }
//       directories {
//         id
//         name
//         allowedMimes
//         capacity
//         resources {
//           id
//           name
//           type
//           url
//           metaData
//           order
//         }
//       }
//       description
//       TIN
//       geoPosition
//     }
//   }
// }
// `;

const queryAboutMyFarm = gql`
 query (
    $id: GraphQLUUID! 
    )   
     {
    farm (
        id: $id
    ) {
      id
      name
      address
      directories {
        id
        name
        allowedMimes
        capacity
        resources {
          id
          name
          updatedAt
          type
          url
          metaData
          order
          preview {
            url
          }
        }
      }
      description
      TIN
      geoPosition
    }
  
}    
`;

const queryAboutNewResource = gql`
 query (
    $id: GraphQLUUID! 
    )   
     {
    resource (
        id: $id
    ) {      
          id
          name
          updatedAt
          type
          url
          metaData
          order
          preview {
            url
          }
        }
      }
 `;

const queryClearResource = gql`
    query (
    $id: GraphQLUUID! 
    ) {
        resource (
        id: $id
        ) {
            delete 
        }
    }
`;

const queryUpdateMyFarm = gql`
    query (
        $id: GraphQLUUID!
        $name: String
        $address: String
        $description: String
        $TIN: String
        $geoPosition: [Float]
    ) {
            farm (
                id: $id
            ) {
                id
                update (
                    name: $name
                    address: $address
                    description: $description
                    TIN: $TIN
                    geoPosition: $geoPosition
                ) {
                  id
                  name
                  address
                  directories {
                    id
                    name
                    allowedMimes
                    capacity
                    resources {
                      id
                      name
                      updatedAt
                      type
                      url
                      metaData
                      order
                      preview {
                        url
                      }
                    }
                  }
                  description
                  TIN
                  geoPosition    
                }
            }
    }
`;

const querySaveOrders = gql`
    query (
        $id: GraphQLUUID!
        $newOrders:  [filterType]!
    ) {
            directory (
                id: $id
            ) {
                id
                saveResourcesOrder (
                    orders: $newOrders
                ) 
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
    queryClearAvatar,
    queryAboutMyFarm,
    queryAboutNewResource,
    queryClearResource,
    queryUpdateMyFarm,
    querySaveOrders
}
