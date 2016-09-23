///<reference path="../../typings/custom/index.d.ts" />

'use strict';

import * as jsdiff from 'diff';
import 'colors';

/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
import * as webdriver from 'selenium-webdriver';
/* tslint:enable */
import WebDriver = webdriver.WebDriver;
import Promise = webdriver.promise.Promise;
import IFulfilledCallback = webdriver.promise.IFulfilledCallback;
import {after, binding, given} from 'cucumber-tsflow/dist/index';

import {driver} from './driver';
import {pattern} from './helpers';

@binding()
class StepSet {

    // TODO: separate
    @given(pattern([
        /^подождать (\d+) секунд.?$/
    ]))
    public awaitXSeconds(seconds: number, callback): void {
        setTimeout(callback, seconds * 1000);
    }

    protected get driver(): WebDriver {
        return driver;
    }

    protected get debug() {
        return process.env.DEBUG;
    }

    protected log(...args: any[]): void {
        if (this.debug) {
            console.log.apply(console, ['     '].concat(args));
        }
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

    protected diff(text: string, other: string, before: string = '', after: string = '') {
        const diff = jsdiff.diffChars(text, other);
        let out: string[] = [];
        diff.forEach(function(part){
            let color = part.added ? 'green' : part.removed ? 'red' : 'black';
            out.push(part.value[color]);
        });
        return before['black'] + out.join('') + after['black'];
    }
}

export = StepSet;
