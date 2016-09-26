'use strict';

/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
import * as webdriver from 'selenium-webdriver';
/* tslint:enable */
import {driver} from '../support/driver';
import Promise = webdriver.promise.Promise;
import {binding, given, when, then} from 'cucumber-tsflow/dist/index';

import StepSet = require('../support/stepset');
import {pattern} from '../support/helpers';

@binding()
class Navigation extends StepSet {

    @when(pattern([
        /обновить страницу/
    ]))
    public async reloadPage(): Promise<void> {
        return await driver.navigate().refresh();
    }

    @given(pattern([
        /^открыт.? (.*)$/
    ]))
    public async onPage(url: string): Promise<void> {
        return await this.navigateToUrl(url);
    }

    @when(pattern([
        /^перейти (?:на|в) (.*)$/
    ]))
    public async navigateToPage(url: string): Promise<void> {
        return await this.navigateToUrl(url);
    }

    @when(pattern([
        /^дождаться перехода (?:на|в) (.*)$/
    ]))
    public async afterUrlChange(url: string): Promise<string> {
        return await this.waitForUrlChange(url, (currentUrl: string) => {
            const diff: string = this.diff(currentUrl, url, '(', ')');
            throw new Error(`Время ожидания ${url} истекло ${diff}`);
        });
    }

    @then(pattern([
        /^должен произойти переход (?:на|в) (.*)$/
    ]))
    public async urlshouldbe(url: string): Promise<string> {
        return await this.waitForUrlChange(url, (currentUrl: string) => {
            const diff: string = this.diff(url, currentUrl, '(', ')');
            throw new Error(`Текущая страница ${currentUrl} ≠ ${url}. ${diff}`);
        });
    }

    protected waitForUrlChange(url: string, otherwise: (url: string) => void): Promise<string> {
        const re: RegExp = new RegExp(url);
        return this.actor<string>({
            invoke: () => driver.getCurrentUrl(),
            until: (currentUrl: string) => re.test(currentUrl),
            during: 15000,
            otherwise: otherwise
        });
    }

    protected async navigateToUrl(url: string): Promise<void> {
        return await driver.get(url);
    }

}

export = Navigation;
