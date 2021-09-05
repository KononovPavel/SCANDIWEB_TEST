import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './productItem.module.css'
type PropsType = {
    imageURL:string,
    name:string,
    price:number,
    inStock:boolean,
    id:string,
    currentCategory:string,
    currentCurrency:number

}
class ProductItem extends React.Component<PropsType> {


    getCurrentCurrencySymbol(currency:number):any{
        if(currency === 0) return <span>&#65284;</span>;
        if(currency === 1) return <span>&#163;</span>
        if(currency === 2) return <span>&#8371;</span>
        if(currency === 3) return <span>&#165;</span>
        if(currency === 4) return <span>&#8381;</span>
        return <span>&#65284;</span>
    }

    render() {
        return (
            <NavLink style={{textDecoration:'none', color:'black'}} to={`/${this.props.currentCategory}/${this.props.id}`}>
                <div className={styles.wrapper}>
                    <div className={styles.imgWrapper}>
                        <img className={styles.img} src={this.props.imageURL} alt=""/>
                        <span className={styles.stock}>{!this.props.inStock?"OUT OF STOCK":''}</span>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.name}>{this.props.name}</div>
                        <div className={styles.price}> {this.getCurrentCurrencySymbol(this.props.currentCurrency)}{this.props.price}</div>
                    </div>
                </div>
            </NavLink>

        );
    }
}

export default ProductItem;
