import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {ChangeCurrentCategory, getCategoriesThunk, getCurrenciesThunk} from "../../redux/reducers/headerReducer";
import {graphql} from "@apollo/client/react/hoc";
import {compose} from "recompose";
import {GET_CATEGORIES_AND_GET_CURRENCIES} from "./queries";
import {NavLink, withRouter} from 'react-router-dom'
import styles from './header.module.css'
import GreenCart from '../../assets/img/GreenCart.svg'
import btn from '../../assets/img/стрелочка-кнопка.png'
import {getCurrentProducts} from "../../redux/reducers/productListReducer";

type PropsType = {
    categories: any[],
    currencies: any[],
    getCategoriesThunk: (categories: any[]) => void,
    getCurrenciesThunk: (currencies: any[]) => void,
    currentCategory: string,
    ChangeCurrentCategory: (category: string) => void,
    getCurrentProducts: (categoryNAME: string) => void,
}
type AllProps = PropsType & any

//props , state
//корзина должна находится в хедере
class Header extends React.Component<AllProps> {


    constructor(props: any) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        this.props.getCategoriesThunk(this.props.data.categories)
        this.props.getCurrenciesThunk(this.props.data.currencies)
    }


    changeCurrentCategory(category:string){
        this.props.ChangeCurrentCategory(category)
        this.props.getCurrentProducts(category)
    }

    render() {


        return (
            <div className={styles.header}>
                <div className={`container ${styles.headerContainer}`}>
                    {
                        this.props.data && this.props.data.categories
                            ? <div className={styles.links}>{
                                this.props.data.categories.map((category: any) =>
                                    <div  key={category.name} onClick={()=>this.changeCurrentCategory(category.name)}>
                                        <NavLink
                                            activeClassName={styles.activeLink}

                                            className={styles.link}
                                            to={'/' + category.name}
                                        ><span className={styles.span}>{category.name}</span>
                                        </NavLink>
                                    </div>

                                )
                            }</div>
                            : <div/>
                    }
                    <div className={styles.cartImage}>
                        <img src={GreenCart} alt=""/>
                    </div>
                    <div className={styles.cartBlock}>
                        <span>&#36;</span>
                        <img className={styles.cart} onClick={() => alert('hello')} src={btn} alt=""/>
                        <div>
                            <div className={styles.CART_NEW}>
                                <div className={styles.cartIcon}>cart</div>
                                <div className={styles.CART_MODAL}>
                                    <div className={styles.cartOverlay}></div>
                                    <div className={styles.cartPopup}>This is a cart Modal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const MSTP = (state: AppStateType) => ({
    categories: state.header.categories,
    currencies: state.header.currencies,
    currentCategory: state.header.currentCategory
})
const MDTP = {
    getCategoriesThunk,
    getCurrenciesThunk,
    ChangeCurrentCategory,
    getCurrentProducts
}


export default compose(
    withRouter,
    graphql(GET_CATEGORIES_AND_GET_CURRENCIES),
    connect(MSTP, MDTP),
)(Header);
