import React from "react";
import './wind-rain.css';
import rainImage from './Vector.png';
import divisorImage from './dividor.png'
import windImage from './wind-image.svg';

class WindRain extends React.Component {
    render() {
        return(
            <div className={'bar'}>
                <p  className={'rain'}>69%</p>
                <img className={'rain-image'} src={rainImage} />
                <img  className={'dividor'} src={divisorImage}/>
                <p className={'wind'}>69 mph</p>
                <img className={'wind-image'} src={windImage}/>
            </div>
        );
    }
}

export default WindRain;