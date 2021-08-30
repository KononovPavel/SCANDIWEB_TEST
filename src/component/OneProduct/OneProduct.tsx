import React, {ComponentType} from 'react';
import compose from 'recompose/compose';
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
//currentProduct
class OneProduct extends React.Component {

    constructor(props:any) {
        super(props);
    }


    render() {
        return (
            <div style={{marginTop:'400px'}}>
            one product
            </div>
        );
    }
}

const MSTP = (state:AppStateType)=>{
    return{
        currentProduct: state.productList.currentProduct
    }
}
const MDTP = {

}

export default connect(MSTP, MDTP)(OneProduct);
