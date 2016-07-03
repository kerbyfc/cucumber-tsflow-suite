import "../typings/index.d.ts";
import "../typings/custom/index.d.ts";

import "babel-core/register";
import "babel-polyfill";

import * as webdriver from "selenium-webdriver";

import {chromedriver} from "selenium-binaries";
process.env.CHROME_DRIVER_PATH = chromedriver;

export const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

webdriver.promise.controlFlow().on("uncaughtException", function(): void {
    driver.quit();
});

process.on("SIGINT", function(): Promise<any> {
    try {
        process.exit();
    } finally {
        driver.quit();
    }
});

// You can only use `await` inside an `async` function.
// Hence the IIFE (immediately-invoked function expression) wrapping
// (async function(): Promise<any> {
//
//     await webdriver.promise.controlFlow().on("uncaughtException",
//         async function(e): Promise<any> {
//             console.log(e);
//             await driver.quit();
//         });
//
//     await process.on("SIGINT", async function(): Promise<any> {
//         try {
//             process.exit();
//         } finally {
//             await driver.quit();
//         }
//     });
//
//     try {
//         await driver.get("http://www.eldorado.ru/");
//
//         const headers: WebElement[] = await driver.findElements(By.css(".header-main-logo"));
//         const width = await headers[0].getAttribute("width");
//
//         console.log(width);
//
//     } finally {
//         await driver.quit();
//     }
//
// } ());