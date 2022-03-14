var express = require("express");
var app = express();
var port = process.env.SERVER_PORT;
var cors = require("cors");
var useDB = require("./configDB/useDB");

require("dotenv").config();

useDB();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

const corsOptions = {
  origin: "https://listquick.netlify.app/",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/items", require("./routes/item"));
app.use("/api/v1/categories", require("./routes/category"));
// start the server
app.listen(port, function () {
  console.log(`app started on port ${port}`);
});
