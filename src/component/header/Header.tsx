import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {
    ChangeCurrentCategory,
    ChangeCurrentCurrency,
    changeSelectStatus,
    getCategoriesThunk,
    getCurrenciesThunk
} from "../../redux/reducers/headerReducer";
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
import SelectComponent from "../Select/SelectComponent";

type PropsType = {
    categories: string[],
    currencies: string[],
    getCategoriesThunk: (categories: string[]) => void,
    getCurrenciesThunk: (currencies: string[]) => void,
    ChangeSelect: (select: boolean) => void,
    currentCategory: string,
    ChangeCurrentCategory: (category: string) => void,
    getCurrentProducts: (categoryNAME: string) => void,
    changeSelectStatus: (select: boolean) => void,
    ChangeCurrentCurrency: (select: boolean, currency: string) => void
    currentCurrency: string,
    select: boolean
}
type AllProps = PropsType & any

//props , state
//корзина должна находится в хедере
class Header extends React.Component<AllProps> {

    componentDidUpdate(prevProps: Readonly<AllProps>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.props.data && this.props.data.categories && this.props.data.currencies ){
            this.props.getCategoriesThunk(this.props.data.categories)
            this.props.getCurrenciesThunk(this.props.data.currencies)
        }
    }


    changeCurrentCategory(category: string) {
        this.props.ChangeCurrentCategory(category)
        this.props.getCurrentProducts(category)
    }

    getCurrentCurrencySymbol(currency: number): any {
        if (currency === 0) return <span>&#65284;</span>;
        if (currency === 1) return <span>&#163;</span>
        if (currency === 2) return <span>&#8371;</span>
        if (currency === 3) return <span>&#165;</span>
        if (currency === 4) return <span>&#8381;</span>
        return <span>&#65284;</span>
    }

    change() {
        this.props.changeSelectStatus(!this.props.select)
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
                                    <div key={category.name} onClick={() => this.changeCurrentCategory(category.name)}>
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
                    <NavLink to={'/cart'} className={styles.cartImage}>
                        <img src={GreenCart} alt=""/>
                    </NavLink>
                    <div className={styles.cartBlock}>
                        <div className={styles.select}>
                            <span style={{paddingBottom: '8px', marginRight: '5px'}}>
                                {this.getCurrentCurrencySymbol(this.props.currentCurrency)}
                            </span>
                            <img className={styles.cart} onClick={() => this.change()} src={btn} alt=""/>
                            {this.props.select && <SelectComponent
                                currencies={this.props.currencies}
                                ChangeCurrentCurrency={this.props.ChangeCurrentCurrency}
                            />}
                        </div>

                        <div>
                            <div className={styles.CART_NEW}>
                                <img style={{marginLeft: '20px', cursor: 'pointer'}} src={cart} alt="" width={20}
                                     height={20}/>
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
    select: state.header.select
})
const MDTP = {
    getCategoriesThunk,
    getCurrenciesThunk,
    ChangeCurrentCategory,
    getCurrentProducts,
    changeSelectStatus,
    ChangeCurrentCurrency

}


export default compose(
    withRouter,
    graphql(GET_CATEGORIES_AND_GET_CURRENCIES),
    connect(MSTP, MDTP),
)(Header);
