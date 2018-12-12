const { URL } = require("url");

function urlBuilder(hostname, pathname) {
    const url = new URL(hostname);

    url.pathname = pathname;
    
    return url.toString();
}

module.exports = urlBuilder;
