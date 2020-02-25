import React from "react";
import CityTitle from "./CityTitle/CityTitle";
import Temperature  from "./Temperature/Temperature";
import Menu from "./Menu/Menu";
import WindRain from "./WindRain/WindRain";
//import DateComponent from "./DateComponent/DateComponent";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:"Loading..",
            currentLocation : {
                lang:0.0,
                lng:0.0,
            },
            temp:" ",
            date:" ",
            time:" ",

        };
        this.getCity = this.getCity.bind(this)
    }

    getCity = async(lat,long) => {
        //API call to get location and temp
        const response = await fetch("http://openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=b6907d289e10d714a6e88b30761fae22");
        const json = await response.json();
        //console.log("HIHIHI" + lat,long);

        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

        // GET TIME
        let d = new Date();
        let hours = d.getHours();
        let mins = d.getMinutes();
        let time = hours + ":" + mins;

        //Get date + day of week

        let dayN = d.getDay();
        let day = days[dayN-1];
        let date = d.getDate();
        let fullDate = day + " " + dayN;


        console.log(time)
        return [json.name, Math.floor(json.main.temp),time,fullDate]



    };

    getDate = () => {
        //Function to get date
        return 'Friday 13th'
    };

    componentDidMount() {

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                });

                this.getCity(coords.latitude,coords.longitude).then((res) => {
                    this.setState({data: res[0]});
                    this.setState({temp: res[1]});
                    this.setState({time: res[2]});
                    this.setState({date: res[3]});

                });

            });

        }

        /*
        this.getCity().then((res) => {
            this.setState({data: res});
        });
        */

    }

    render() {



        //var date = this.getDate();
        return (
            <div>

                <Menu />
                <CityTitle city={[this.state.data,this.state.time,this.state.date]} />
                <Temperature temp={this.state.temp + "°C"}/>
                <WindRain />

            </div>
        );
    }
}

export default Main;