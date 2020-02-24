import React from "react";
import './cityText.css';
class CityTitle extends React.Component {
    render() {
        return(
            <div>
                <p  className={'date'}>Friday 13th</p>
                <p className={'time'} >13:00</p>
                <p className={'cityText'}>{this.props.city}</p>
            </div>
        );
    }
}

export default CityTitle;