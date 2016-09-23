"use strict";

require('babel-core/register');
require('babel-polyfill');
var webdriver = require('selenium-webdriver');
var selenium_binaries_1 = require('selenium-binaries');
process.env.CHROME_DRIVER_PATH = selenium_binaries_1.chromedriver;
exports.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();