///<reference path="../../typings/custom/index.d.ts" />

'use strict';

/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
import * as webdriver from 'selenium-webdriver';
/* tslint:enable */
import {driver} from './driver';
import WebDriver = webdriver.WebDriver;
import Promise = webdriver.promise.Promise;
import IFulfilledCallback = webdriver.promise.IFulfilledCallback;
import {binding} from 'cucumber-tsflow/dist/index';

@binding()
class StepSet {

    protected get driver(): WebDriver {
        return driver;
    }

    // TODO: create class
    protected async actor<T>(action: IActor<T>): Promise<T> {
        return new Promise((resolve: IFulfilledCallback<T>) => {
            let result: T;
            if (!action.during) {
                action.during = 5010;
            }
            if (!action.every) {
                action.every = 1000;
            }

            const timer = setTimeout(() => {
                clearInterval(loop);
                action.otherwise(result);
            }, action.during);

            const loop = setInterval(async () => {
                result = await action.invoke();
                if (action.until(result)) {
                    clearInterval(loop);
                    clearTimeout(timer);
                    resolve(result);
                }
            }, action.every);
        });
    }
}

export = StepSet;
