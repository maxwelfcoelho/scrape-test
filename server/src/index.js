const express = require("express");

const scrapeRouter = require("./routes/scrape");

const app = express();

app.use(scrapeRouter);

app.listen(4000);
