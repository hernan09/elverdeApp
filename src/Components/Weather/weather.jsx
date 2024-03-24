import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import sunnyImage from '../../assets/images/clima/clear-day.svg';
import cloudImage from '../../assets/images/clima/cloudy.svg';
import rainyImage from '../../assets/images/clima/rain.svg';
import snowImage from '../../assets/images/clima/snow.svg';
import thunderImage from '../../assets/images/clima/hurricane.svg';
import './weather.css'

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'a62cd253fd9cea7f8f473ef83d38952f'; // Reemplaza con tu clave de API de OpenWeather
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&appid=${apiKey}&units=metric`
        );

        setWeatherData(response?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos del clima:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const renderWeatherIcon = () => {
    const weatherCondition = weatherData?.weather[0]?.main?.toLowerCase();

    switch (weatherCondition) {
      case 'clear':
        return <img className='img-clima' src={sunnyImage} alt="Sunny" />;
      case 'clouds':
        return <img className='img-clima' src={cloudImage} alt="Cloudy" />;
      case 'rain':
        return <img className='img-clima' src={rainyImage} alt="Rainy" />;
      case 'snow':
        return <img className='img-clima' src={snowImage} alt="Snowy" />;
      case 'thunderstorm':
        return <img className='img-clima' src={thunderImage} alt="Thunderstorm" />;
      default:
        return null;
    }
  };

  return (
    <div className='content-weather'>
      {loading ? (
        <p>Cargando datos del clima...</p>
      ) : (
        <div className='content-data'>
          <h2 className='title-clima'>Buenos Aires</h2>
          <p className='temp'>{weatherData?.main?.temp} °C</p>
          <div>{renderWeatherIcon()}</div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
