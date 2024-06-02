const axios = require("axios");

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        throw new Error(`Failed to fetch amazon product`);
    }
}

module.exports = fetchData;
