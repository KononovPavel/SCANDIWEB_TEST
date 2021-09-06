import React, {Component} from 'react';
import styles from './Item.module.css'
import {productType} from "../../../redux/reducers/productListReducer";

type PropsType = {
    item: productType,
    currentCurrency: number,
    SetDeletedAttribute: (id: string) => void,
    SetIncrementCount: (id: string) => void,
    SetDecrementCount: (id: string) => void
}
type StateType = {
    count:number
}
class Item extends Component<PropsType,StateType> {

    constructor(props:PropsType) {
        super(props);
        this.state = {
            count: this.props.item.count
        } as StateType
    }
    getCurrentCurrencySymbol(currency: number): any {
        if (currency === 0) return <span>&#65284;</span>;
        if (currency === 1) return <span>&#163;</span>
        if (currency === 2) return <span>&#8371;</span>
        if (currency === 3) return <span>&#165;</span>
        if (currency === 4) return <span>&#8381;</span>
        return <span>&#65284;</span>
    }

    getCurrentAmount(count: number, amount: number): number {
        if (count === 0) return 0
        return count * amount
    }shouldComponentUpdate(nextProps: Readonly<PropsType>, nextState: Readonly<{}>, nextContext: any): boolean {
        return this.props.item.count == nextProps.item.count
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.item}>
                    <div>
                        <span className={styles.text}>{this.props.item.brand}</span><br/>
                        <span className={styles.text}>{this.props.item.name}</span>
                        <p className={styles.price}>{this.getCurrentCurrencySymbol(this.props.currentCurrency)}{this.getCurrentAmount(this.props.item.count, this.props.item.prices[this.props.currentCurrency].amount)}</p>
                        <div>
                            {this.props.item.currentAttributes
                                ? this.props.item.currentAttributes.map((item: any) => <div
                                    className={styles.displayValue}
                                    style={{background: item.value ? item.value : ''}}
                                >{item.displayValue}
                                </div>)
                                : ''
                            }
                        </div>
                    </div>
                    <div className={styles.settings_Photo}>
                        <div className={styles.counter}>
                            <div
                                className={styles.change}
                                onClick={()=>this.props.SetIncrementCount(this.props.item.id)}
                            >
                                +
                            </div>
                            <div className={styles.count}>
                                {this.props.item.count}
                            </div>
                            <div
                                onClick={()=> this.props.SetDecrementCount(this.props.item.id)}
                                className={styles.change}
                            >
                                -
                            </div>
                        </div>
                        <div><img src={this.props.item.gallery[0]} alt="" width={105} height={137}/></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Item;
