const { JSDOM } = require("jsdom");

const Product = require("../models/product");

function scrapeProducts(html) {
    const dom = new JSDOM(html);

    const document = dom.window.document;
    const contentDiv = document.querySelectorAll('[data-component-type="s-search-result"]');

    const products = [];
    contentDiv.forEach((productDiv) => {
        const productImageUrl = scrapeProductImage(productDiv);
        const productTitle = scrapeProductTitle(productDiv);
        const productRating = scrapeProductRating(productDiv);
        const productReviews = scrapeProductReviews(productDiv);

        const product = new Product(productTitle, productRating, productReviews, productImageUrl);
        products.push(product);
    });
    return products;
}

function scrapeProductReviews(productDiv) {
    const productReviews = productDiv.querySelector('[data-component-type="s-client-side-analytics"]')
    if (!productReviews) {
        return 0;
    }
    return isNaN(parseInt(productReviews.textContent)) ? 0 : parseInt(productReviews.textContent);
}

function scrapeProductRating(productDiv) {
    const productRating = productDiv.querySelector('.a-icon-alt')
    if (!productRating) {
        return '';
    }
    return productRating.textContent;
}

function scrapeProductTitle(productDiv) {
    const productTitle = productDiv.querySelector('[data-cy="title-recipe"]')
    if (!productTitle || productTitle.children.length === 0) {
        return  '';
    }
    return productTitle.children[0].textContent.trim();
}

function scrapeProductImage(productDiv) {
    const productImageUrl = productDiv.querySelector("[data-image-load]");
    if (!productImageUrl) {
        return '';
    }
    return productImageUrl.getAttribute("src");
}

module.exports = scrapeProducts;
