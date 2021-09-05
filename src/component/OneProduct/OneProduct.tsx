import React from 'react';
import styles from './onProduct.module.css'
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {
    addProductToCartTC,
    getCurrentImage,
    productType,
    setAttributesTC
} from "../../redux/reducers/productListReducer";
import Preloader from "../../common/Preloader";
//currentProduct
type PropsType = {
    currentProduct: productType,
    currentBigImage: string,
    getCurrentImage: (image: string) => void
    addProductToCartTC: (product: productType) => void
    currentCurrency: number,
    setAttributesTC: (value: any) => void
}


class OneProduct extends React.Component<PropsType> {


    componentDidMount() {
        if (
            this.props.currentProduct && this.props.currentProduct.gallery
        ) {
            this.props.getCurrentImage(this.props.currentProduct.gallery[0])
        }
    }

    getCurrentCurrencySymbol(currency: number): any {
        if (currency === 0) return <span>&#65284;</span>;
        if (currency === 1) return <span>&#163;</span>
        if (currency === 2) return <span>&#8371;</span>
        if (currency === 3) return <span>&#165;</span>
        if (currency === 4) return <span>&#8381;</span>
        return <span>&#65284;</span>
    }

//Задание на скг
    onChangeCurrentBigImage(value: string) {
        this.props.getCurrentImage(value)
    }

    addProductAtCart(product: productType) {
        this.props.addProductToCartTC(product)
    }

    setEditDescription(value: string): string {

        return value
            .replace(/(<([^>]+)>)/ig, '')
            .trim()
            .replace(/\s\s+/g, '.')
            .replace(/([.]+)/g, '.')
    }


    render() {
        return (

            <div style={{marginTop: '160px'}} className={`container ${styles.oneProductContainer}`}>
                {
                    this.props.currentProduct && this.props.currentProduct.gallery
                        ? <div className={styles.wrapper}>
                            <div className={styles.photos}>
                                {
                                    this.props.currentProduct.gallery.map((photo: any) => <div
                                        onClick={() => this.onChangeCurrentBigImage(photo)}
                                        className={styles.productPhoto}
                                        key={photo}>
                                        <img src={photo} alt="" width={80} height={80}/>
                                    </div>)
                                }
                            </div>
                            <div className={styles.CurrentPhoto}>
                                <img src={this.props.currentBigImage} alt="" width={610}/>
                            </div>
                            <div className={styles.information}>
                                <h3 className={styles.brand}>{this.props.currentProduct.brand}</h3>
                                <p className={styles.name}>{this.props.currentProduct.name}</p>
                                {
                                    this.props.currentProduct.attributes.map((attribut: any) => <div key={attribut.id}>
                                        <div className={styles.name}>{attribut.name}</div>
                                        <div className={styles.attributes}>{attribut.items.map((item: any) => {
                                                return (attribut.name === 'Color'
                                                        ?
                                                        <div
                                                            style={{background: `${item.value}`}}
                                                            className={ styles.itemColor}
                                                            onClick={() =>this.props.setAttributesTC(item)}//????
                                                            key={item.id}
                                                        />
                                                        : <div className={styles.items} key={item.id}>
                                                            <div
                                                                onClick={() =>this.props.setAttributesTC(item)}//???
                                                                className={styles.item}
                                                            >{item.displayValue}</div>
                                                        </div>
                                                )
                                            }
                                        )}</div>
                                    </div>)
                                }
                                <div className={styles.priceText}>price:</div>
                                <div
                                    className={styles.price}>{this.getCurrentCurrencySymbol(this.props.currentCurrency)}{this.props.currentProduct.prices[this.props.currentCurrency].amount}</div>
                                <button
                                    onClick={() => this.addProductAtCart(this.props.currentProduct)}
                                    className={styles.addToCartButton}>add to cart
                                </button>
                                <div
                                    className={styles.description}>{this.setEditDescription(this.props.currentProduct.description)}</div>
                            </div>
                        </div>
                        : <div>
                            <Preloader/>
                        </div>
                }


            </div>
        );
    }
}

const MSTP = (state: AppStateType) => {
    return {
        currentProduct: state.productList.currentProduct,
        currentBigImage: state.productList.currentBigImage,
        currentCurrency: state.header.currentCurrency
    }
}
const MDTP = {
    getCurrentImage,
    addProductToCartTC,
    setAttributesTC
}

export default connect(MSTP, MDTP)(OneProduct);
