import React, {Component, ComponentType} from 'react';
import compose from 'recompose/compose';
import styles from './cart.module.css';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {productType} from "../../redux/reducers/productListReducer";
import CartItem from "./CartItem/CartItem";
type PropsType = {
    cartItems:productType[]
}

class Cart extends Component<PropsType & any> {
    render() {
        return (
            <div className={`container ${styles.cartContainer}`}>
               <div style={{marginTop:'160px'}}>
                   <p className={styles.cart}>cart</p>
                   <div>
                       {this.props.cartItems.length !== 0
                           ? this.props.cartItems.map((item:productType)=><CartItem key={item.id} item={item}/>)
                           : <div>Bag is empty :(</div>
                       }
                   </div>
               </div>
            </div>
        );
    }
}
const MSTP = (state:AppStateType)=>{
    return{
        cartItems: state.productList.cartItems
    }
}

export default compose<ComponentType,any>(connect(MSTP))(Cart) ;
