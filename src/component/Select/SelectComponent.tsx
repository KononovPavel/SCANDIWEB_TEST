import React, {Component} from 'react';
import styles from './Select.module.css'

type PropsType ={
    currencies:number[],
    ChangeCurrentCurrency:(select:boolean, currency:number)=>void

}
class SelectComponent extends Component<PropsType> {

    getCurrentCurrencySymbol(currency: number): any {
        if (currency === 1) return <>&#65284;</>;
        if (currency === 2) return <>&#163;</>
        if (currency === 3) return <>&#8371;</>
        if (currency === 4) return <>&#165;</>
        if (currency === 5) return <>&#8381;</>
        return <span>&#65284;</span>
    }


    render() {
        return (
            <div className={styles.select}>
                {
                    this.props.currencies.map(currency => <div
                        onClick={()=>this.props.ChangeCurrentCurrency(false, currency)}
                        className={styles.currencies}
                        key={currency}
                    >
                        {this.getCurrentCurrencySymbol(currency)}   {currency}
                    </div>)
                }
            </div>
        );
    }
}

export default SelectComponent;
