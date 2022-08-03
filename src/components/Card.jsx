import React, { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";

import Load from './Load.jsx'
const Card = ({ lat, lon }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const [temp, setTemp] = useState(null);
  const [loadPage, setLoadPage] = useState(true);
  const [button, setButton] = useState(false);
  useEffect(() => {
    if (lat != undefined) {
      const apiKey = "6f5566c40eddf4dd53df691e992696d2";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      axios(url)
        .then((res) => {
          setWeatherInfo(res.data);
          setTemp(res.data.main.temp);
          setLoadPage(false)
        })
        .catch((e) => console.log(e));
    }
  }, [lat, lon]);


const temp_variable=button?`${parseInt(temp-273.15)}°C`:`${parseInt((temp-273.15)*(9/5)+32)}°F`;

  function changeTemp(){
    setButton(!button)
  }

  if(loadPage){
    return <Load/>
  }else{
    return (

      <div className="card cardWeather">
  
          <div className="container_titles_info_weather">
          <h1>
          {weatherInfo?.name}, {weatherInfo?.sys.country}{" "}
        </h1>
        <h3>
          "{weatherInfo?.weather[0].main}, {weatherInfo?.weather[0].description}"
        </h3>
          </div>
        
  
        <div className="temperature_container">
         
         <h2>{temp_variable}</h2>
       </div>
  
        <div className="infoWeather_container_principal">
        <div className="wind_speed_container">
          <i class="fa-solid fa-wind"></i>
          <h3>Wind Speed: {weatherInfo?.wind.speed} m/s</h3>
        </div>
  
        <div className="clouds_container">
          <i class="fa-solid fa-cloud"></i>
          <h3>Clouds: {weatherInfo?.clouds.all}%</h3>
        </div>
        {/* 
         "main": {
      "temp": 282.55,
      "feels_like": 281.86,
      "temp_min": 280.37,
      "temp_max": 284.26,
      "pressure": 1023,
      "humidity": 100
    }, */}
        <div className="plessure_container">
          <i class="fa-solid fa-temperature-three-quarters"></i>
          <h3>Plessure: {weatherInfo?.main.pressure} hPa</h3>
        </div>
  
  
        <div className="humidity_container">
        <i class="fa-solid fa-droplet-degree"></i>
          <h3>Humidity: {weatherInfo?.main.humidity} %</h3>
        </div>
        </div>
        
  
        
  
        <div onClick={changeTemp} className="buttom_container">
          <i class="fa-solid fa-shuffle"></i>
          <input  class={"button"} type={"button"} value={"degrees °F/°C"} />
        </div>
      </div>
    );
  }
  
};

export default Card;
