"use strict";
require('babel-core/register');
require('babel-polyfill');
const webdriver = require('selenium-webdriver');
const selenium_binaries_1 = require('selenium-binaries');
process.env.CHROME_DRIVER_PATH = selenium_binaries_1.chromedriver;
exports.driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
