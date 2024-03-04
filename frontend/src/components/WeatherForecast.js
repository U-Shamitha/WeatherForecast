import React from 'react';
import '../WeatherForecast..css';

const WeatherForecast = ({ forecast }) => {
    // Group forecast data by day
    const groupedForecast = groupForecastByDay(forecast);

    return (
        <div className="forecast-container">
            <p style={{color:'#004de6', fontSize:'4vmin'}}>5-Day Weather Forecast</p>
            {groupedForecast.map((dayForecast, index) => (
                <div key={index} className="forecast-row">
                    <h3>{formatDate(dayForecast[0].dt_txt)}</h3>
                    <div className="forecast-scroll">
                        {dayForecast.map(item => (
                            <div key={item.dt} className="forecast-item">
                                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" />
                                <p>Time: {getTime(item.dt_txt)}</p>
                                <p>Temperature: {item.main.temp}°C</p>
                                <p>Feels Like: {item.main.feels_like}°C</p>
                                <p>Weather: {item.weather[0].description}</p>
                                <p>Wind Speed: {item.wind.speed} m/s</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
};

const getTime = (dateTimeString) => {
    const time = new Date(dateTimeString);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};

const groupForecastByDay = (forecast) => {
    const groupedForecast = {};
    forecast.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!groupedForecast[date]) {
            groupedForecast[date] = [];
        }
        groupedForecast[date].push(item);
    });
    return Object.values(groupedForecast);
};

export default WeatherForecast;
