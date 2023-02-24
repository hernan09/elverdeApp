import React from 'react';
import ReactWeather from 'react-open-weather';
import './weather.css'

const weather = () => {
    return (
        <div className='content-weather'>
            <ReactWeather
                forecast="today"
                apikey='f6c8c507e62c5591abe1abce08ef9296'
                type="geo"
                lat="-34.53103266355572"
                lon="-58.4195836316558"
            />
        </div>
    );
};

export default weather;