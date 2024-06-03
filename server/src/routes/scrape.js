const { Router } = require("express");
const { query } = require("express-validator");

const ScrapeController = require("../controllers/scrape");

const router = Router();

const scrapeController = new ScrapeController();

// given a query parameter `keyword`, fetch the html of the page and extract the products, if the html page is found
// I remove the spaces on the start and end of the string, and scape to avoid any type of attack(even though we are not using databases)
// I also validate the size, I am not sure but I think amazon keyword can be until 2500
router.get(
    "/api/scrape/",
    query("keyword")
    .trim()
    .escape()
    .notEmpty().withMessage('Keyword is required')
    .isLength({ min: 1, max: 2500 }).withMessage('Keyword must be between 1 and 2500 characters')
    .matches(/^[a-zA-Z0-9\s\-,.]+$/).withMessage('Keyword contains invalid characters'),
    (req, res) => scrapeController.scrape(req, res));

module.exports = router;
