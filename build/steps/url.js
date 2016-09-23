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
/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
const webdriver = require('selenium-webdriver');
const uri = require('urijs');
/* tslint:enable */
var Promise = webdriver.promise.Promise;
const index_1 = require('cucumber-tsflow/dist/index');
const StepSet = require('../support/stepset');
const helpers_1 = require('../support/helpers');
let UrlStepSet = class UrlStepSet extends StepSet {
    constructor(...args) {
        super(...args);
        this.hashParams = /(\?|\&)([^=]+)\=([^&]+)/;
    }
    addGetParameter(name, value) {
        return __awaiter(this, void 0, Promise, function* () {
            const url = yield this.getCurrentUrl();
            url.addSearch(name, value);
            return yield this.pushState(url.href());
        });
    }
    addHashParametr(name, value) {
        return __awaiter(this, void 0, Promise, function* () {
            const url = yield this.getCurrentUrl();
            const hash = [url.hash(), `${name}=${value}`];
            url.hash(hash.join(this.hashParams.test(hash[0]) ? '&' : ''));
            return yield this.pushState(url.href());
        });
    }
    getCurrentUrl() {
        return __awaiter(this, void 0, Promise, function* () {
            return uri(yield this.driver.getCurrentUrl());
        });
    }
    pushState(url, title) {
        return __awaiter(this, void 0, Promise, function* () {
            if (title === void (0)) {
                title = yield this.driver.getTitle();
            }
            return this.driver.executeScript(`window.history.pushState({}, '${title}', '${url}');`);
        });
    }
};
__decorate([
    index_1.when(helpers_1.pattern([
        /^добавить get-параметр (.*) со значением (.*)$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String, String]), 
    __metadata('design:returntype', Promise)
], UrlStepSet.prototype, "addGetParameter", null);
__decorate([
    index_1.when(/^добавить hash-параметр (.*) со значением (.*)$/), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String, String]), 
    __metadata('design:returntype', Promise)
], UrlStepSet.prototype, "addHashParametr", null);
UrlStepSet = __decorate([
    index_1.binding(), 
    __metadata('design:paramtypes', [])
], UrlStepSet);
module.exports = UrlStepSet;
