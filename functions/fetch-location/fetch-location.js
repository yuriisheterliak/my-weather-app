const axios = require('axios');

const handler = async (event) => {
  const locationName = event.queryStringParameters.locationName;
  const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
  const geocodingURL = `https://api.geoapify.com/v1/geocode/autocomplete?`;

  try {
    const { data } = await axios.get(geocodingURL, {
      params: {
        text: locationName,
        limit: 5,
        apiKey: LOCATION_API_KEY,
      },
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
