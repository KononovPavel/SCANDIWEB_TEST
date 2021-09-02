import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './productItem.module.css'
type PropsType = {
    imageURL:string,
    name:string,
    price:string,
    inStock:boolean,
    id:string,
    currentCategory:string
}
class ProductItem extends React.Component<PropsType> {

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
                        <div className={styles.price}>{this.props.price}</div>
                    </div>
                </div>
            </NavLink>

        );
    }
}

export default ProductItem;
