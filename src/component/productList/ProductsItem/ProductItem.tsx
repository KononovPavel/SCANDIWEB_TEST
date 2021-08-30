import React from 'react';
import styles from './productItem.module.css'
type PropsType = {
    imageURL:string,
    name:string,
    price:string,
    inStock:boolean
}
class ProductItem extends React.Component<PropsType> {
    constructor(props:PropsType) {
        super(props);

    }

    render() {
        return (
                <div className={styles.wrapper}>
                    <div className={styles.imgWrapper}>
                        <img className={styles.img} src={this.props.imageURL} alt=""/>
                        <span className={styles.stock}>{this.props.inStock?"OUT OF STOCK":''}</span>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.name}>{this.props.name}</div>
                        <div className={styles.price}>{this.props.price}</div>
                    </div>
                </div>
        );
    }
}

export default ProductItem;
