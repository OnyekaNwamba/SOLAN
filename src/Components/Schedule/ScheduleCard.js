import React, { useState, useRef, useEffect } from "react";
import SunnyImage from "../../assets/sunny.svg";
import ThunderstormImage from "../../assets/thunder.svg";
import CloudImage from "../../assets/cloudy.svg";
import DrizzleImage from "../../assets/drizzle.svg";
import SnowImage from "../../assets/snow.svg"
import RainImage from "../../assets/rain.svg"
import "./Schedule.css";
import Card from "../Card/Card";
import { GOOGLE_API_KEY } from "../../utils";

const ICONS = {
  Clouds: `${CloudImage}`,
  Rain: `${RainImage}`,
  Clear: `${SunnyImage}`,
  Drizzle: `${DrizzleImage}`,
  Snow: `${SnowImage}`,
  Thunderstorm: `${ThunderstormImage}`
};

const ScheduleCard = ({
  placeId,
  location,
  time,
  icon,
  temp,
  weather,
  marker,
  photos,
  rating
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  const mapEl = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const map = new google.maps.Map(mapEl.current, {
      zoom: 15,
      center: {
        lat: marker.lat,
        lng: marker.long
      }
    });

    const request = {
      placeId,
      fields: ["name", "formatted_address", "place_id", "geometry"]
    };

    // eslint-disable-next-line no-undef
    const infoWindow = new google.maps.InfoWindow();

    // eslint-disable-next-line no-undef
    const service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
      // eslint-disable-next-line no-undef
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // eslint-disable-next-line no-undef
        const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        // eslint-disable-next-line no-undef
        google.maps.event.addListener(marker, "click", () => {
          infoWindow.setContent(
            `<div><strong>${place.name}</strong><br>Place ID: ${place.place_id}<br>${place.formatted_address}</div>`
          );
          infoWindow.open(map, this);
        });
      }
    });
  }, []);

  return (
    <Card className="ma-3">
      <div className="header">
        <div className="left">
          <h3>{time}</h3>
          <h3>{temp}°C</h3>
          <img src={ICONS[icon]} alt={icon} />
          <p className="has-text-center">{weather}</p>
        </div>
        <div className="ml-2">
          <h3 className="has-text-center">{location}</h3>
          <div className="center">
            <div style={{ height: "128px", width: "128px" }} ref={mapEl}></div>
          </div>
        </div>
      </div>

      {expanded ? <div className="more-info">

        <p>Rating:{rating}</p>

        <div className="py-3">
          {photos.length > 0 ? photos.map((photo) => {
            return <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`} />
          }) : null}
        </div>
      </div> : null}
      <i className="material-icons" onClick={handleExpanded}>
        {expanded ? "expand_less" : "expand_more"}
      </i>
    </Card>
  );
};

export default ScheduleCard;
