'use strict';

/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
import * as webdriver from 'selenium-webdriver';
/* tslint:enable */
import {binding, given, when, then} from 'cucumber-tsflow/dist/index';
import {driver} from '../support/driver';
import StepSet = require('../support/stepset');

@binding()
class Navigation extends StepSet {

    @given(/^открыта страница (.*)$/)
    public async onPage(url: string): Promise<void> {
        return await this.navigateToUrl(url);
    }

    @when(/(?:обнов|перезагруз)ить страницу/)
    public async reloadPage(): Promise<void> {
        return await driver.navigate().refresh();
    }

    @when(/^(?:за|пере)йти на страницу (.*)$/)
    public async navigateToPage(url: string): Promise<void> {
        return await this.navigateToUrl(url);
    }

    /**
     * TODO move to another file
     */
    @given(/^подождать (\d+) секунд.?$/)
    public awaitXSeconds(seconds: number, callback): void {
        setTimeout(callback, seconds * 1000);
    }

    @then(/^должна открыться страница (.*)$/)
    public async urlShouldBe(url: string): Promise<string> {
        const re: RegExp = new RegExp(url);
        return await this.actor<string>({
            invoke: () => driver.getCurrentUrl(),
            until: (currentUrl: string) => re.test(currentUrl),
            during: 15000,
            otherwise: (currentUrl: string) => {
                throw new Error(`Текущая страница ${currentUrl} ≠ ${url}`);
            }
        });
    }

    protected async navigateToUrl(url: string): Promise<void> {
        return await driver.get(url);
    }

}

export = Navigation;
