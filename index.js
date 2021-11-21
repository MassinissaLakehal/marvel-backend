const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(formidable());

app.get("/comics", async (req, res) => {
  const getComics = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API}`
  );
  res.json(getComics.data);
});

app.get("/characters", async (req, res) => {
  const getCharacters = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API}`
  );
  res.status(200).json(getCharacters.data);
});

app.get("/comics/:characterId", async (req, res) => {
  const getCharacterId = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API}`
  );
  //console.log(getCharacterId.data);
  res.status(200).json(getCharacterId.data);
});

app.listen(4000, () => {
  console.log("Server has started");
});

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});
