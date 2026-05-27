import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sunnyImage from '../../assets/images/clima/clear-day.svg';
import cloudImage from '../../assets/images/clima/cloudy.svg';
import rainyImage from '../../assets/images/clima/rain.svg';
import snowImage from '../../assets/images/clima/snow.svg';
import thunderImage from '../../assets/images/clima/hurricane.svg';
import './weather.css'

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'a62cd253fd9cea7f8f473ef83d38952f';
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

  const getTempGradient = () => {
    if (!weatherData) return '';
    const temp = weatherData?.main?.temp;
    if (temp >= 28) return 'gradient-hot';
    if (temp >= 20) return 'gradient-warm';
    if (temp >= 12) return 'gradient-neutral';
    return 'gradient-cool';
  };

  const getTempLabel = () => {
    if (!weatherData) return '';
    const temp = weatherData?.main?.temp;
    if (temp >= 30) return 'Muy caluroso';
    if (temp >= 25) return 'Caluroso';
    if (temp >= 20) return 'Templado';
    if (temp >= 15) return 'Agradable';
    if (temp >= 10) return 'Fresco';
    if (temp >= 5) return 'Frío';
    return 'Muy frío';
  };

  const renderWeatherIcon = () => {
    const weatherCondition = weatherData?.weather[0]?.main?.toLowerCase();
    const iconMap = {
      clear: sunnyImage,
      clouds: cloudImage,
      rain: rainyImage,
      snow: snowImage,
      thunderstorm: thunderImage,
    };
    const src = iconMap[weatherCondition];
    if (!src) return null;
    return <img className='img-clima' src={src} alt={weatherData?.weather[0]?.description || ''} />;
  };

  const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1) || '';

  return (
    <div
      className={`content-weather ${getTempGradient()}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      role="button"
      tabIndex={0}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
    >
      {loading ? (
        <p className='weather-loading'>Cargando clima...</p>
      ) : (
        <>
          <div className='content-data'>
            <div className='city-group'>
              <span className='location-dot' />
              <h2 className='title-clima'>Buenos Aires</h2>
            </div>
            {renderWeatherIcon()}
            <div className='temp-group'>
              <p className='temp'>{Math.round(weatherData?.main?.temp)}°</p>
              <span className='temp-label'>{getTempLabel()}</span>
            </div>
          </div>
          <div className={`weather-details ${expanded ? 'visible' : ''}`}>
            <span className='weather-desc'>{capitalize(weatherData?.weather[0]?.description)}</span>
            <span className='detail-sep' />
            <span className='detail-item'>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
              {weatherData?.main?.humidity}%
            </span>
            <span className='detail-sep' />
            <span className='detail-item'>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
              </svg>
              {Math.round(weatherData?.wind?.speed)} km/h
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherComponent;
