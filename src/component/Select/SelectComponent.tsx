import React, {Component} from 'react';
import styles from './Select.module.css'

type PropsType ={
    currencies:string[],
    ChangeCurrentCurrency:(select:boolean, currency:number)=>void

}
class SelectComponent extends Component<PropsType> {

    getCurrentCurrencySymbol(currency: number): any {
        if (currency === 0) return <>&#65284;</>;
        if (currency === 1) return <>&#163;</>
        if (currency === 2) return <>&#8371;</>
        if (currency === 3) return <>&#165;</>
        if (currency === 4) return <>&#8381;</>
        return <span>&#65284;</span>
    }


    render() {
        return (
            <div className={styles.select}>
                {
                    this.props.currencies.map((currency, index) => <div
                        onClick={()=>this.props.ChangeCurrentCurrency(false, index)}
                        className={styles.currencies}
                        key={currency}
                    >
                        {this.getCurrentCurrencySymbol(index)}   {currency}
                    </div>)
                }
            </div>
        );
    }
}

export default SelectComponent;
