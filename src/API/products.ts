import {gql} from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORIES_NAME = gql`
query getProductsByCategoryName($name:String!){
    category(input:{title:$name}){
        products{
            id, name,inStock,gallery,description, category,
             prices{
                currency, amount
             }
             attributes{
                 id, name, type,items{
                     displayValue,value,id
                 }
             }
        }
    }
}
`

export const GET_PRODUCT_BY_ID = gql`
query getProductByID($id:String!) {
  product(id:$id){
    name, id, inStock, gallery, description, category,
    attributes{
      name, type,items{
        displayValue,value,id
      }
    },
    prices{
      currency,amount, 
    },
    brand
  }
}
`

