const express = require("express");
const {
  crawlFilm,
  getFilms,
  deleteAll,
  detailFilm,
} = require("../controllers/filmController");
const route = express.Router();

route.get("/crawl-films", crawlFilm);
route.get("/list/new-films", getFilms);
route.get("/:slug", detailFilm);
route.delete("/delete-all", deleteAll);

module.exports = route;
