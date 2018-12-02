const scraper = require("../scrapers/scraper");

function scrapeUrls(request, response, next) {
    const urls = [
        "https://www.reddit.com",
        "https://www.reddit.com/r/leagueoflegends"
    ]
    // const { urls } = request.body || {};

    scraper.redditScraper.scrapeUrls(urls).then(data => {
        response.json(data);
    }).catch(error => next(error))
}

module.exports = {
    scrapeUrls
};
