import React from "react";
import './menu.css';
import current from './current.png';
class Menu extends React.Component {
    render() {
        return(
            <div className={"menu-bar"}>
                <p className={'today'}>Today</p>
                <img className={"current"} src={current} />
                <p className={'schedule'}>Schedule</p>
                <p className={'next-5-days'}> Next 5 days </p>
            </div>
        );
    }
}

export default Menu;