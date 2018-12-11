const scrapers = require("../scrapers/scraper");
const urlBuilder = require("../utils/urlBuilder");
const websiteConfig = require("../config/websites.json");

function scrapeUrls(request, response, next) {
    // const { urls } = request.body || {};
    Object.entries(websiteConfig).forEach(([hostname, config]) => {
        const { sites, scraperName } = config;
        const urls = sites.map(urlBuilder.bind(null, hostname));
    
        scrapers[scraperName].scrapeUrls(urls).then(data => {
            response.json(data);
        }).catch(error => next(error))
    })
}

module.exports = {
    scrapeUrls
};
