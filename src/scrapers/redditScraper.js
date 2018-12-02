const puppeteer = require('puppeteer');
const $ = require('cheerio');

const URL_PARSER_REGEX = /\((.+?)\)/;

//[DS] Rethink the way that the data is formatted. maybe want to flatten it.
function scrapeUrls(urls = []) {
    const scrapedContent = urls.map(scrapeUrl);

    return Promise.all(scrapedContent).then(content => {
        return content;
    });
}
//[DS] Figure out a way to do do this asynchronously without causing intense cpu hogging
function scrapeUrl(url) {
    let scrapedContent = [];
    let tempBrowser;

    return puppeteer
        .launch()
        .then(browser => {        
            tempBrowser = browser;
            const page = browser.newPage();
            return page;
        })
        .then(page => {
            return page.goto(url).then(function() {
                return page.content();
            });
        })
        .then(html => {
            $(".scrollerItem", html).each(function() {
                const articleTags = $("article", this);
                //handle photo posts

                //handle article posts
                if (articleTags.length > 0) {
                    scrapedContent.push(extractArticle(articleTags.first()));
                }
            });
        })
        .then(() => {
            tempBrowser.close();

            console.log(scrapedContent);
            return {
                [url]: scrapedContent
            }

        })
        .catch(function(err) {
            console.log("ERROR", err);
        });
}

//TODO: refactor this later. pretty ugly
function extractArticle(content) {
    const { "0": articleContent, "1": imageContent } = $(content).children();

    const { "0": postData, "1": headlineData, "2": originalArticle } = $(articleContent).children();

    const { "0": subRedditData, "4": timestampData } = $(postData).children().eq(1).children().eq(0).children(); 
    const sourceUrl = $("a", originalArticle).attr("href");
    const sourceThumbnail = extractUrlFromEncapsulation($("a", imageContent).children().first().css("background-image"));
    
    return {
        subReddit: $(subRedditData).text(),
        timestamp: $(timestampData).text(),
        headline: $(headlineData).text().trim(),
        sourceUrl,
        sourceThumbnail
    }
}

function extractUrlFromEncapsulation(urlString = "") {
    const extractedUrl = urlString.match(URL_PARSER_REGEX);

    if (extractedUrl) {
        return extractedUrl[1];
    }

    return undefined;
}

function formatScrapedContent() {

}

module.exports = {
    scrapeUrl,
    scrapeUrls
}
