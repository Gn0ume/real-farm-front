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

const queryMyGoods = gql`
    {
        me {
            id
            stocks {
                id
                farm {
                    id
                    name
                }
                name
                quantity
                updatedAt
                description
                photos {
                   preview {
                    url
                    }               
                }
                price
                currency
                units
                categoryId                
             }
         }
     }
`;

const queryAboutProduct = gql`
 query (
    $id: GraphQLUUID! 
    )   
     {
    stock (
        id: $id
    ) {
      id
      name
      price
      currency
      quantity
      description
      units
      categoryId 
      farm {
        id
        name
      }    
      directories {
        id
        name
        capacity
        resources {
          id
          name
          url
          metaData
          order
          preview {
            url
          }        
        }
      }
    }  
}    
`;

const queryUpdateMyProduct = gql`
    query (
        $id: GraphQLUUID!
        $name: String
        $farmId: GraphQLUUID
        $price: Float
        $currency: Currency
        $units: Unit
        $categoryId: GraphQLUUID  
        $description: String
        $quantity: Int              
    ) {
            stock (
                id: $id
            ) {
                id
                update (
                    name: $name
                    farmId: $farmId
                    price: $price
                    currency: $currency
                    units: $units
                    categoryId: $categoryId  
                    description: $description
                    quantity: $quantity               
                ) {
                  id
                  name
                  quantity
                  description
                  price
                  currency
                  units
                  categoryId  
                  farm {
                    id
                    name
                  }   
                  directories {
                    id
                    name
                    capacity
                    resources {
                      id
                      name
                      url
                      metaData
                      order
                      preview {
                        url
                      }        
                    }
                  }    
                }
            }
    }
`;

const queryGetMyFarms = gql`
    {
        me {
            id
            farms {
              id
              name
              }
            }
     }
`;

const queryDeleteProduct = gql`
    query (
    $id: GraphQLUUID! 
    ) {
        stock (
        id: $id
        ) {
            delete 
        }
    }
`;

const queryGetUnits = gql`
{
  __type(name: "Unit") {
    name
    kind
    enumValues {
      name
    }
  }
}`;

const queryAllGoods = gql`
  query (
    $page: Int! 
    $perPage: Int!
    $categories: [GraphQLUUID]
    $priceRange: PriceRangeInput
    )
    {
      stocks (
        paginator: {
           page: $page,
           perPage: $perPage
        }, 
        filter: {
          categories: $categories,
          priceRange: $priceRange
        }
      ) {
        filter {
          categoriesJSON 
          priceRange {
            min
            max
          }
        }
        paginator {
          page
          totalPages
        }
        list {
          id
          name
          price
          currency
          units
          categoryId
          quantity
          photos {
            preview {
                url
            }
          }
          farm {
            id
            name
          }
          updatedAt
          description      
        }
      }
  }  
`;

const queryAddNewStock = gql`
mutation {
        createStock {
            id
        }
}`;

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
    querySaveOrders,
    queryMyGoods,
    queryAboutProduct,
    queryUpdateMyProduct,
    queryGetMyFarms,
    queryDeleteProduct,
    queryGetUnits,
    queryAllGoods,
    queryAddNewStock
}
