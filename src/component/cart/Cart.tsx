import React, {Component, ComponentType} from 'react';
import compose from 'recompose/compose';
import styles from './cart.module.css';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
type PropsType = {

}

class Cart extends Component {
    render() {
        return (
            <div className={`container`}>
               <div style={{marginTop:'160px'}}>
                   <p className={styles.cart}>cart</p>
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

export default compose<ComponentType,PropsType>(connect())(Cart) ;
