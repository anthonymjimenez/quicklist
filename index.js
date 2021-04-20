// init server
// server.js
var express = require("express");
var app = express();
var port = 8080;
var cors = require("cors");
var useDB = require("./config/useDB");

require("dotenv").config();

useDB();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/items", require("./routes/items"));

// start the server
app.listen(port, function () {
  console.log(`app started on port ${port}`);
});
