/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
import * as webdriver from 'selenium-webdriver';
/* tslint:enable */

import {binding, given} from 'cucumber-tsflow/dist/index';
import {driver} from '../support/driver';
import Promise = webdriver.promise.Promise;

@binding()
class Navigation {

    @given(/^зайти на страницу "([^"]*)"$/)
    public async navigateToPage(url: string): Promise<void> {
        await driver.get(url);
    }

    /**
     * TODO move to another file
     */
    @given(/^подождать (\d+) секунды?$/)
    public awaitXSeconds(seconds: number, callback): void {
        setTimeout(callback, seconds * 1000);
    }

}

export = Navigation;
