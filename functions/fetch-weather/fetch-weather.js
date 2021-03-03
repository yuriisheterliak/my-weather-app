const axios = require('axios');

const handler = async (event) => {
  const { lat, lng } = event.queryStringParameters;
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  const baseWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?';
  const parameters = `lat=${lat}&lon=${lng}&exclude=current,minutely&units=metric&appid=${WEATHER_API_KEY}`;
  const weatherURL = `${baseWeatherURL}${parameters}`;

  try {
    const { data } = await axios.get(weatherURL);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
