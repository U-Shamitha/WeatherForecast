const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 5000;

const apiKey = '96345cc1b16d4128389a1fe14cd27523'; // Replace with your OpenWeatherMap API key

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        const forecast = await getWeatherForecast(city);
        res.json(forecast);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

async function getWeatherForecast(city) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch weather data from OpenWeatherMap API
    const response = await axios.get(apiUrl);
    const forecastData = response.data.list;

    // Extract relevant data for the next 5 days
    const fiveDayForecast = forecastData.slice(0, 5).map(item => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description
    }));

    return forecastData;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
