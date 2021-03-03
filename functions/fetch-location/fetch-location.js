const axios = require('axios');

const handler = async (event) => {
  const locationName = event.queryStringParameters.locationName;
  const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
  const geocodingURL = `https://api.opencagedata.com/geocode/v1/json?q=${locationName}&limit=1&key=${LOCATION_API_KEY}`;

  try {
    const { data } = await axios.get(geocodingURL);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
