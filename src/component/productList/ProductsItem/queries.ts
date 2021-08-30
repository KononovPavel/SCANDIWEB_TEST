import {gql} from "@apollo/client";

export const GET_PRODUCTS_ALL = gql`
query{
  categories{
    products{
      id,name,inStock,gallery,description,category, attributes{
        id,name,type,items{
          displayValue,value,id
        }
      },
      prices{
        currency,
        amount
      },
      brand
  }
}
}
`
