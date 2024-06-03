const keywordInput = document.querySelector("input");
const productsDiv = document.querySelector(".products");
const scrapeButton = document.querySelector("button");
const errorSpan = document.getElementById("error");

// The description says to create a simple web page,
// So I'm not sure how much effort should I put into it.
// it's not supporting older browsers, because I am using flexbox and grid
// I'm also using a few features of JavaScript that are not supported in older browsers

// this function is used to make an ajax request tomy server
// I could reuse the fetch data of the backend in a shared folder
// because the front-end and back-end uses the same language
// I opt to not overcomplicated, because it's a simple web page
async function fetchData(keyword) {
    const response = await fetch(`http://localhost:4000/api/scrape/?keyword=${keyword}`);
    if (!response.ok) {
        throw new Error(await response.text())
    }
    return await response.json();
}

// I create a function to reuse when I display an error
// I am removing the error after 2 seconds
function displayError(message) {
    const errorSpan = document.getElementById("error");
    errorSpan.textContent = message;
    window.setTimeout(() => {
        errorSpan.textContent = '';
    }, 2000);
}

// Here I check if the user typed the keyword on the input
// if not I display an error. I could also validate if it's a validate keyword
// escape malicious code, etc. I choose to not overcomplicate
// because in The client it can be easily deactivated
async function scrapePosts(e) {
    const keyword = keywordInput.value;
    if (!keyword) {
        displayError("Please, provide a keyword");
        return;
    }

    try {
        const products = await fetchData(keyword);
        if (products.length === 0) {
            productsDiv.textContent = 'No results found'
        } else {
            productsDiv.textContent = '';
            for (const product of products) {
                renderProduct(product);
            }
        }
        keywordInput.value = '';
    } catch(err) {
        const errorMessage = JSON.parse(err.message).error.msg
        displayError(errorMessage);
    }
}

scrapeButton.addEventListener("click", scrapePosts);

function renderProduct(product) {
    const div = document.createElement("div");
    div.className = 'product';
    const image = document.createElement("img");
    image.src = product.imageUrl;

    const title = document.createElement("h2");
    title.textContent = product.title;

    const rating = document.createElement("p");
    rating.textContent = product.rating;

    const reviews = document.createElement("p");
    reviews.textContent = `reviews: ${product.numberOfReviews}`;

    div.appendChild(image);
    div.appendChild(title);
    div.appendChild(rating);
    div.appendChild(reviews);
    productsDiv.appendChild(div);
}
