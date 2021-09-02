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
import cart from '../../assets/img/Vector.svg'
import {getCurrentProducts} from "../../redux/reducers/productListReducer";
import CartModule from "../cartModule/CartModule";

type PropsType = {
    categories: any[],
    currencies: any[],
    getCategoriesThunk: (categories: any[]) => void,
    getCurrenciesThunk: (currencies: any[]) => void,
    currentCategory: string,
    ChangeCurrentCategory: (category: string) => void,
    getCurrentProducts: (categoryNAME: string) => void,
    currentCurrency:string,
    select:boolean
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

    changeCurrentCurrency(){

    }
    getCurrentCurrencySymbol(currency:string):string{
        if(currency === 'USD') return '&#65284;'
        if(currency === 'GBP') return '&#163;'
        if(currency === 'AUD') return '&#8371;'
        if(currency === 'JPY') return '165;'
        if(currency === 'RUB') return '&#8381;'
        return '&#65284;'
    }

    render() {
    //GBP - &#163;  AUD - &#8371; JPY - &#165;  USD - &#65284; RUB - &#8381;

        return (
            <div className={styles.header}>
                <div className={`container ${styles.headerContainer}`}>
                    {
                        this.props.categories
                            ? <div className={styles.links}>{
                                this.props.categories.map((category: any) =>
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
                    <NavLink to={'/cart'}  className={styles.cartImage}>
                        <img src={GreenCart} alt=""/>
                    </NavLink>
                    <div className={styles.cartBlock}>
                        <div>
                            <span style={{paddingBottom:'8px', marginRight:'5px'}}>&#65284;</span>
                            <img className={styles.cart} onClick={() => alert('hello')} src={btn} alt=""/>
                        </div>

                        <div>
                            <div className={styles.CART_NEW}>
                              <img style={{marginLeft:'20px', cursor:'pointer'}} src={cart} alt="" width={20} height={20}/>
                                <div className={styles.CART_MODAL}>
                                    <div className={styles.cartOverlay}></div>
                                    <div className={styles.cartPopup}><CartModule/></div>
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
    currentCategory: state.header.currentCategory,
    currentCurrency: state.header.currentCurrency,
    select:state.header.select
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
