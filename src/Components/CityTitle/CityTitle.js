import React from "react";
import './cityText.css';
class CityTitle extends React.Component {
    render() {
        return(
            <div>
                <p  className={'date'}>{this.props.city[2]}</p>
                <p className={'time'} >{this.props.city[1]}</p>
                <p className={'cityText'}>{this.props.city[0]}</p>
            </div>
        );
    }
}

export default CityTitle;