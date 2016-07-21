/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
import * as webdriver from 'selenium-webdriver';
/* tslint:enable */

import {binding, given, when} from 'cucumber-tsflow/dist/index';
import {driver} from '../support/driver';
import Promise = webdriver.promise.Promise;

@binding()
class Navigation {

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

    protected async navigateToUrl(url: string): Promise<void> {
        return await driver.get(url);
    }

}

export = Navigation;
