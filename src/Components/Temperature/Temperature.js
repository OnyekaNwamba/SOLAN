import React from "react";
import './temperature.css';
import rectangle from './random-rectangle.png';
class Temperature extends React.Component {
    render() {
        return(
            <div>
                <img className={'randomRectangle'} src={rectangle} />
                <h1 className={'temperatureText'}>25 °C</h1>
            </div>
        );
    }
}

export default Temperature;