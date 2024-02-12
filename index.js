const connection = require("./dataBase/connection");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const artistRoutes = require("./routes/artist");
const albumRoutes = require("./routes/album");

const app = express();
const port = 3500;


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

//rutas de usuario
app.use("/api/user", userRoutes);
//rutas de cancion
app.use("/api/song", songRoutes);
//rutas de playlist
app.use("/api/playlist", playlistRoutes);
//rutas de artista
app.use("/api/artist", artistRoutes);
//rutas de album
app.use("/api/album", albumRoutes);

app.listen(port, () => {
  console.log("Currently running on port " + port);
});

connection();
