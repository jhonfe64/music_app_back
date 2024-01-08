const connection = require("./dataBase/connection");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log("Currently running on port " + port);
});

connection();
