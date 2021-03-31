// init server
// server.js
var express = require("express");
var app = express();
var port = 8080;

app.use(express.json());

app.use("/api/v1/items", require("./routes/items"));

// start the server
app.listen(port, function () {
  console.log(`app started on port ${port}`);
});
