const connection = require("./dataBase/connection");
const express = require("express");
const cors = require("cors");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 300;

app.listen(port, () => {
  console.log("Currently running on port " + port);
});

connection();
