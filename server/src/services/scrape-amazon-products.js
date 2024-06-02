const { JSDOM } = require("jsdom");

const Product = require("../models/product");

function scrapeProducts(html) {
    const dom = new JSDOM(html);

    const document = dom.window.document;
    const contentDiv = document.querySelectorAll('[data-component-type="s-search-result"]');

    const products = [];
    contentDiv.forEach((productDiv) => {
        const productImageUrl = productDiv.querySelector("[data-image-load]").getAttribute("src");
        const productTitle = productDiv.querySelector('[data-cy="title-recipe"]').children[0].textContent.trim();
        const productRating = productDiv.querySelector('.a-icon-alt').textContent;
        const productReviews = parseInt(productDiv.querySelector('[data-component-type="s-client-side-analytics"]').textContent);

        const product = new Product(productTitle, productRating, productReviews, productImageUrl);
        products.push(product);
    });
    return products;
}

module.exports = scrapeProducts;
