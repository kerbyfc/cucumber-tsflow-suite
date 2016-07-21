///<reference path="../../typings/custom/index.d.ts" />

import "babel-core/register";
import "babel-polyfill";

import * as webdriver from "selenium-webdriver";

import {chromedriver} from "selenium-binaries";
process.env.CHROME_DRIVER_PATH = chromedriver;

export const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

