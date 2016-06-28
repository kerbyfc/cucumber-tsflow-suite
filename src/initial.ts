import '../typings/index.d.ts';
import '../typings/custom/index.d.ts';

import WebElement = webdriver.WebElement;
import 'babel-core/register';
import 'babel-polyfill';

import {Promise} from 'es6-promise';

import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

import {chromedriver} from 'selenium-binaries';
process.env.CHROME_DRIVER_PATH = chromedriver;

// Shorten the names we'll use a lot
const By = webdriver.By;
const until = webdriver.until;

// Configure WebDriver. Nothing async yet.
// Could also move into next function no problem.
const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

// You can only use `await` inside an `async` function.
// Hence the IIFE (immediately-invoked function expression) wrapping
(async function(): Promise<any> {

    await webdriver.promise.controlFlow().on('uncaughtException',
        async function(e): Promise<any> {
            console.log(e);
            await driver.quit();
        });

    await process.on('SIGINT', async function(): Promise<any> {
        try {
            process.exit();
        } finally {
            await driver.quit();
        }
    });

    try {
        await driver.get('http://www.eldorado.ru/');

        const headers: WebElement[] = await driver.findElements(By.css('.header-main-logo'));
        const width = await headers[0].getAttribute('width');

        console.log(width);

    } finally {
        await driver.quit();
    }

} ());