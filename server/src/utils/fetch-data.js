const axios = require("axios");

// this function makes a request using axios to a given url, if it returns an error I throw a customized exception,
// because I don't want to return the default axios error
// I made it more general, so I could reuse it in the future to fetch data, like json, html, xml, etc.
// I thought about returning null when error, but I choose to just throw an exception.
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        throw new Error(`Failed to fetch ${url}`);
    }
}

module.exports = fetchData;
