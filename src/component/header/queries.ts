import {gql} from "@apollo/client";

export const GET_CATEGORIES_AND_GET_CURRENCIES = gql`
    query{
        categories{
            name
        },
        currencies
    }
`
