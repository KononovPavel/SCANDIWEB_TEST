import React, {ComponentType} from 'react';
import compose from 'recompose/compose';
import styles from './cartModule.module.css'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {productType} from "../../redux/reducers/productListReducer";
import Item from "./Item/Item";


type PropsType = {
    cartItems: productType[],
    currentCurrency:number
}

class CartModule extends React.Component<PropsType & any> {

    getCurrentCurrencySymbol(currency: number): any {
        if (currency === 0) return <>&#65284;</>;
        if (currency === 1) return <>&#163;</>
        if (currency === 2) return <>&#8371;</>
        if (currency === 3) return <>&#165;</>
        if (currency === 4) return <>&#8381;</>
        return <>&#65284;</>
    }

    render() {
        return (

            <React.Fragment>
                {
                    this.props.cartItems && this.props.cartItems.length
                        ? <div style={{width:'100%'}}>
                            <h3 className={styles.count}><b>My Bag,</b> {this.props.cartItems.length} items</h3>
                            <>
                            {
                                this.props.cartItems.map((item:productType)=><Item currentCurrency={this.props.currentCurrency} key={item.id} item={item}/>)
                            }</>
                            <span className={styles.total}>Total {this.getCurrentCurrencySymbol(this.props.currentCurrency)}{this.props.cartItems.reduce((acc:number,el:any)=>acc + el.prices[this.props.currentCurrency].amount,0)} </span>
                        <div className={styles.buttons}>
                            <button className={styles.buttonView}>view bag</button>
                            <button className={styles.buttonCheckOut}>check out</button>
                        </div>

                        </div>
                        : <div className={styles.emptyBag} style={{width:'100%', height:'300px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            My bag is empty
                        </div>
                }

            </React.Fragment>
        );
    }
}

const MSTP = (state: AppStateType) => {
    return {
        cartItems: state.productList.cartItems,
        currentCurrency: state.header.currentCurrency
    }
}

export default compose<ComponentType, any>(connect(MSTP))(CartModule);
