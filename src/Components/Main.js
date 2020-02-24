import React from "react";
import CityTitle from "./CityTitle/CityTitle";
import Temperature  from "./Temperature/Temperature";
import Menu from "./Menu/Menu";
import WindRain from "./WindRain/WindRain";
//import DateComponent from "./DateComponent/DateComponent";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";

class Main extends React.Component {
    getCity =  () => {
       //API CALL TO GET CITY
        return "London";
    };

    getDate = () => {
        //Function to get date
        return 'Friday 13th'
    };
    render() {
        var promiseCity = this.getCity();
        //var date = this.getDate();
        return (
            <div>
                <Menu />
                <CityTitle city={promiseCity} />
                <Temperature />
                <WindRain />

            </div>
        );
    }
}

export default Main;