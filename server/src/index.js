const express = require("express");
const cors = require("cors");

const scrapeRouter = require("./routes/scrape");

const app = express();

app.use(cors());
app.use(scrapeRouter);

app.listen(4000);
