import React, {Component} from 'react';
import styles from './Item.module.css'
import {productType} from "../../../redux/reducers/productListReducer";

type PropsType = {
    item: productType
}

class Item extends Component<PropsType> {
    render() {
        return (
            <React.Fragment>
                <div className={styles.item}>
                    <div>
                        <span>{this.props.item.brand}</span>
                        <span>{this.props.item.name}</span>
                        <p>{this.props.item.prices[0].amount}</p>
                        <div>
                            {this.props.item.attributes.map((items: any) => <div>
                                <span>{items.name}</span>
                                {items.items.map((item: any) => <div>
                                    {item.dispayValue}
                                </div>)}
                            </div>)}
                        </div>
                    </div>
                    <div className={styles.settings_Photo}>
                        <div className={styles.counter}>
                            <div className={styles.change}>
                                +
                            </div>
                            <div className={styles.count}>
                                1
                            </div>
                            <div className={styles.change}>
                                -
                            </div>
                        </div>
                        <div><img src={this.props.item.gallery[0]} alt="" width={105}  height={137}/></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Item;
