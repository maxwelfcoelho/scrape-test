const { validationResult } = require("express-validator");

const fetchData = require("../utils/fetch-data");
const scrapeProducts = require("../services/scrape-amazon-products");
const config = require("../config/config");

class ScrapeController {
    async scrape(req, res) {
        const { keyword } = req.query;

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                errors: result.array()
            });
        }

        try {
            const html = await fetchData(`${config.baseUrl}s?k=${keyword}&page=1`);

            const products = scrapeProducts(html);

            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
}

module.exports = ScrapeController;
