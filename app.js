'use strict';

var HtmlController = require('./src/html-controller');

var config = {
    hubUrl: process.env.HUB_URL,
    hubPassword: process.env.HUB_PASSWORD,
    port: process.env.PORT
};

new HtmlController(config);
