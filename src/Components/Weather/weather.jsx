import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { MdLocationOn } from 'react-icons/md';
import './weather.css'

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'a62cd253fd9cea7f8f473ef83d38952f';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&appid=${apiKey}&units=metric&lang=es`
        );

        setWeatherData(response?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos del clima:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    const weatherCondition = weatherData?.weather[0]?.main?.toLowerCase();

    switch (weatherCondition) {
      case 'clear':
        return <WiDaySunny className="weather-icon" />;
      case 'clouds':
        return <WiCloudy className="weather-icon" />;
      case 'rain':
        return <WiRain className="weather-icon" />;
      case 'snow':
        return <WiSnow className="weather-icon" />;
      case 'thunderstorm':
        return <WiThunderstorm className="weather-icon" />;
      default:
        return <WiCloudy className="weather-icon" />;
    }
  };

  if (loading) {
    return (
      <div className='weather-container loading'>
        <div className="weather-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className='weather-container'>
      <div className='weather-content'>
        <div className='weather-info-group'>
          <MdLocationOn className="location-icon" />
          <span className='city-name'>Buenos Aires</span>
        </div>
        <div className='weather-info-group'>
          {getWeatherIcon()}
          <span className='temperature'>{Math.round(weatherData?.main?.temp)}°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
