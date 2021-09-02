import React from 'react';
import gif from '../assets/Preloader.gif'

class Preloader extends React.Component {
    render() {
        return (
            <div style={{position:'fixed', top:'-100px', left:'200px'}}>
                <img src={gif} alt="" width={500} height={500}/>
                <div>Something error(</div>
            </div>
        );
    }
}

export default Preloader;
