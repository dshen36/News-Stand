const express = require("express");
const scraperController = require("../controllers/scraperController");

const scraper = express.Router();

scraper.get("/scrape/urls", scraperController.scrapeUrls);

module.exports = scraper;
