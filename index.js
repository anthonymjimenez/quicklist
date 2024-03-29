var express = require("express");
var app = express();
var port = process.env.PORT || 7000;
var cors = require("cors");
var useDB = require("./configDB/useDB");

require("dotenv").config();

useDB();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

app.use(cors());
app.use(express.json());

app.use("/api/v1/items", require("./routes/item"));
app.use("/api/v1/categories", require("./routes/category"));
// start the server
app.listen(port, function () {
  console.log(`app started on port ${port}`);
});
