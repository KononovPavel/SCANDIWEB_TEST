import React, {ComponentType} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {graphql} from "@apollo/client/react/hoc";
import {compose} from "recompose";
import {GET_PRODUCTS_ALL} from "./ProductsItem/queries";
import {AppStateType} from "../../redux/store";
import styles from './productList.module.css'
import {getAllProducts, getCurrentProducts, productType} from "../../redux/reducers/productListReducer";
import ProductItem from "./ProductsItem/ProductItem";

type PropsType = {
    currentCategory: string,
    products:productType[],
    getCurrentProducts: (categoryNAME: string) => void,
    getAllProducts: (state: productType[]) => void,
    currentProducts: productType[]
}
type AllType = PropsType & any

class ProductsList extends React.Component<AllType, any> {
    constructor(props: PropsType) {
        super(props);

    }



    componentDidMount () {
        console.log('RESPONSE componentDidMount', this.props)

        if(this.props.data.categories && this.props.data){
            let array = this.props.data.categories.map((el: any) => el.products).flat()
            this.props.getAllProducts(array)
        }
    }


    componentDidUpdate (prevProps:any) {
        if(this.props.data.categories !== prevProps.data.categories){
            let array = this.props.data.categories.map((el: any) => el.products).flat()
            this.props.getAllProducts(array)
            this.props.getCurrentProducts(this.props.currentCategory)
        }

        console.log('RESPONSE componentDidUpdate', this.props.currentProducts)
    }


//currentProducts.map
    render() {
        console.log('map data', this.props.products)
        return (
            <div className={`${styles.productListContainer} container`}>
                <span className={styles.categoryName}>{this.props.currentCategory}</span>
                <div className={styles.products}>
                    {
                        this.props.currentProducts
                            ? <div className={styles.productWrapper}>
                                {this.props.currentProducts.map((product:productType)=> <div
                                    className={styles.card}
                                    key={product.id}
                                    style={{opacity: product.inStock? 0.5:1}}
                                >
                                  <ProductItem
                                      imageURL={product.gallery[0]}
                                      name={product.name}
                                      price={product.prices[0].amount}
                                      inStock={product.inStock}
                                  />
                                </div>)}

                            </div>
                            : <span>Товаров нет</span>
                    }
                </div>
            </div>
        );
    }
}

const MSTP = (state: AppStateType) => {
    console.log('STATE PRODUCT', state)
    return {
        currentCategory: state.header.currentCategory,
        currentProducts: state.productList.currentProducts,
        products: state.productList.products
    }
}
const MDTP = {
    getAllProducts,
    getCurrentProducts,
}

export default compose<ComponentType | any, any>(
    withRouter,
    connect(MSTP, MDTP),
    graphql(GET_PRODUCTS_ALL),
)(ProductsList);
