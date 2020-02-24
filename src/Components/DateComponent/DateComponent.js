import React from "react";
import './date-component.css';
class DateComponent extends React.Component {
    render() {
        return(
            <div className={'date'}>
                <h3>{this.props.date}</h3>
            </div>
        );
    }
}

export default DateComponent;