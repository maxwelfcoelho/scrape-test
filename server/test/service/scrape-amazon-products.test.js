const scrapeProducts = require("../../src/services/scrape-amazon-products");
const Product = require("../../src/models/product");

test("handles empty html document", () => {
    const html = ``;
    const expected = [];
    const products = scrapeProducts(html);
    expect(products).toEqual(expected);
});

test("handler missing product elements", () => {
    const html = `
        <html>
            <body>
                <div data-component-type="s-search-result">
                    <!-- Missing title and rating -->
                    <img data-image-load src="http://image-testone">
                    <span data-component-type="s-client-side-analytics">
                        <span>10</span>
                    </span>
                </div>
            </body>
        </html>
    `;
    const expected = [
        new Product('', '', 10, 'http://image-testone')
    ];
    const products = scrapeProducts(html);
    expect(products).toEqual(expected);
});

test("handle valid products list", () => {
    const html = `
        <html>
            <body>
                <div>
                    <div data-component-type="s-search-result">
                        <div>
                            <img data-image-load src="http://image-testone">
                        </div>
                        <div>
                            <div data-cy="title-recipe">
                                <span>Product 1</span>
                            <div>
                            <div>
                                <div>
                                    <span class="a-icon-alt">4.4 out of 5 stars</span>
                                </div>
                                <span data-component-type="s-client-side-analytics">
                                    <span>10</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div data-component-type="s-search-result">
                        <div>
                            <img data-image-load src="http://image-testtwo">
                        </div>
                        <div>
                            <div data-cy="title-recipe">
                                <span>Product 2</span>
                            <div>
                            <div>
                                <div>
                                    <span class="a-icon-alt">2.0 out of 5 stars</span>
                                </div>
                                <span data-component-type="s-client-side-analytics">
                                    <span>55</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;

    const expected = [
        new Product('Product 1', '4.4 out of 5 stars', 10, 'http://image-testone'),
        new Product('Product 2', '2.0 out of 5 stars', 55, 'http://image-testtwo')
    ];

    const products = scrapeProducts(html);
    expect(products).toEqual(expected);
});
