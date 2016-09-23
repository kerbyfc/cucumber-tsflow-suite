'use strict';

/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
import * as webdriver from 'selenium-webdriver';
import * as uri from 'urijs';
import URI = uri.URI;
/* tslint:enable */

import Promise = webdriver.promise.Promise;
import {binding, when} from 'cucumber-tsflow/dist/index';

import StepSet = require('../support/stepset');
import {pattern} from '../support/helpers';

@binding()
class UrlStepSet extends StepSet {

    private hashParams: RegExp = /(\?|\&)([^=]+)\=([^&]+)/;

    @when(pattern([
        /^добавить get-параметр (.*) со значением (.*)$/
    ]))
    public async addGetParameter(name: string, value: string): Promise<void> {
        const url: URI = await this.getCurrentUrl();
        url.addSearch(name, value);
        return await this.pushState(url.href());
    }

    @when(/^добавить hash-параметр (.*) со значением (.*)$/)
    public async addHashParametr(name: string, value: string): Promise<void> {
        const url: URI = await this.getCurrentUrl();
        const hash: string[] = [url.hash(), `${name}=${value}`];
        url.hash(hash.join(this.hashParams.test(hash[0]) ? '&' : ''));
        return await this.pushState(url.href());
    }

    protected async getCurrentUrl(): Promise<URI> {
        return uri(await this.driver.getCurrentUrl());
    }

    protected async pushState(url: string, title?: string): Promise<any> {
        if (title === void(0)) {
            title = await this.driver.getTitle();
        }
        return this.driver.executeScript(`window.history.pushState({}, '${title}', '${url}');`);
    }

}

export = UrlStepSet;