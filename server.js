const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//parse request of content-type: application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to rob's application." });
});

require("./routes/exercise.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
