import React, {Component} from 'react';
import styles from './cartItem.module.css';
import {productType} from "../../../redux/reducers/productListReducer";
type PropsType = {
    item:productType
}

class CartItem extends Component<PropsType> {
    render() {
        return (
            <div className={styles.cartItem}>
                <div className={styles.info}>
                    <h3>{this.props.item.brand}</h3>
                    <p>{this.props.item.name}</p>
                </div>
                <div className={styles.settings_Photo}>
                    <div className={styles.counter}>

                        <div className={styles.change}>+</div>
                        <div>1</div>
                        <div className={styles.change}>-</div>

                    </div>
                    <div><img src={this.props.item.gallery[0]} alt="" width={140} height={185}/></div>
                </div>

            </div>
        );
    }
}

export default CartItem;
