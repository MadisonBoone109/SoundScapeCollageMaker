// netlify/functions/deezer.js
const axios = require("axios");

exports.handler = async (event) => {
  const query = event.queryStringParameters.q || "lofi";

  try {
    const response = await axios.get(`https://api.deezer.com/search?q=${query}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};
