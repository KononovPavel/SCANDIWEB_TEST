import React, {Component} from 'react';
import styles from './Select.module.css'

type PropsType ={
    currencies:string[],
    ChangeCurrentCurrency:(select:boolean, currency:string)=>void

}
class SelectComponent extends Component<PropsType> {

    getCurrentCurrencySymbol(currency: string): any {
        if (currency === 'USD') return <>&#65284;</>;
        if (currency === 'GBP') return <>&#163;</>
        if (currency === 'AUD') return <>&#8371;</>
        if (currency === 'JPY') return <>&#165;</>
        if (currency === 'RUB') return <>&#8381;</>
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
