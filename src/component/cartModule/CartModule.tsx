import React, {ComponentType} from 'react';
import compose from 'recompose/compose';
import styles from './cartModule.module.css'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {productType} from "../../redux/reducers/productListReducer";
import Item from "./Item/Item";

type PropsType = {
    cartItems: productType[]
}

class CartModule extends React.Component<PropsType & any> {
    render() {
        return (

            <React.Fragment>
                {
                    this.props.cartItems && this.props.cartItems.length
                        ? <div>
                            <h3 className={styles.count}><b>My Bag,</b> {this.props.cartItems.length} items</h3>
                            <>
                            {
                                this.props.cartItems.map((item:productType)=><Item key={item.id} item={item}/>)
                            }</>
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
        cartItems: state.productList.cartItems
    }
}

export default compose<ComponentType, any>(connect(MSTP))(CartModule);
