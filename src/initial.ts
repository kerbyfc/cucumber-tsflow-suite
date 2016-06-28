import '../typings/index.d.ts';
import '../typings/custom/index.d.ts';

import 'babel-core/register';
import 'babel-polyfill';

import {Promise} from 'es6-promise';

import {
  By,
  WebElement,
  until
} from 'selenium-webdriver';

import {chromedriver} from 'selenium-binaries';
process.env.CHROME_DRIVER_PATH = chromedriver;


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