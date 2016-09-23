///<reference path="../../typings/custom/index.d.ts" />
'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const jsdiff = require('diff');
require('colors');
/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
const webdriver = require('selenium-webdriver');
var Promise = webdriver.promise.Promise;
const index_1 = require('cucumber-tsflow/dist/index');
const driver_1 = require('./driver');
const helpers_1 = require('./helpers');
let StepSet = class StepSet {
    // TODO: separate
    awaitXSeconds(seconds, callback) {
        setTimeout(callback, seconds * 1000);
    }
    get driver() {
        return driver_1.driver;
    }
    get debug() {
        return process.env.DEBUG;
    }
    log(...args) {
        if (this.debug) {
            console.log.apply(console, ['     '].concat(args));
        }
    }
    // TODO: create class
    actor(action) {
        return __awaiter(this, void 0, Promise, function* () {
            return new Promise((resolve) => {
                let result;
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
                const loop = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    result = yield action.invoke();
                    if (action.until(result)) {
                        clearInterval(loop);
                        clearTimeout(timer);
                        resolve(result);
                    }
                }), action.every);
            });
        });
    }
    diff(text, other, before = '', after = '') {
        const diff = jsdiff.diffChars(text, other);
        let out = [];
        diff.forEach(function (part) {
            let color = part.added ? 'green' : part.removed ? 'red' : 'black';
            out.push(part.value[color]);
        });
        return before['black'] + out.join('') + after['black'];
    }
};
__decorate([
    index_1.given(helpers_1.pattern([
        /^подождать (\d+) секунд.?$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Number, Object]), 
    __metadata('design:returntype', void 0)
], StepSet.prototype, "awaitXSeconds", null);
StepSet = __decorate([
    index_1.binding(), 
    __metadata('design:paramtypes', [])
], StepSet);
module.exports = StepSet;
