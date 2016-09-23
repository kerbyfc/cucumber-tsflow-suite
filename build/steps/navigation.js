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
/* tslint:enable */
const driver_1 = require('../support/driver');
var Promise = webdriver.promise.Promise;
const index_1 = require('cucumber-tsflow/dist/index');
const StepSet = require('../support/stepset');
const helpers_1 = require('../support/helpers');
let Navigation = class Navigation extends StepSet {
    onPage(url) {
        return __awaiter(this, void 0, Promise, function* () {
            return yield this.navigateToUrl(url);
        });
    }
    reloadPage() {
        return __awaiter(this, void 0, Promise, function* () {
            return yield driver_1.driver.navigate().refresh();
        });
    }
    navigateToPage(url) {
        return __awaiter(this, void 0, Promise, function* () {
            return yield this.navigateToUrl(url);
        });
    }
    afterUrlChange(url) {
        return __awaiter(this, void 0, Promise, function* () {
            return yield this.waitForUrlChange(url, (currentUrl) => {
                const diff = this.diff(currentUrl, url, '(', ')');
                throw new Error(`Время ожидания ${url} истекло ${diff}`);
            });
        });
    }
    urlShouldBe(url) {
        return __awaiter(this, void 0, Promise, function* () {
            return yield this.waitForUrlChange(url, (currentUrl) => {
                const diff = this.diff(url, currentUrl, '(', ')');
                throw new Error(`Текущая страница ${currentUrl} ≠ ${url}. ${diff}`);
            });
        });
    }
    waitForUrlChange(url, otherwise) {
        const re = new RegExp(url);
        return this.actor({
            invoke: () => driver_1.driver.getCurrentUrl(),
            until: (currentUrl) => re.test(currentUrl),
            during: 15000,
            otherwise: otherwise
        });
    }
    navigateToUrl(url) {
        return __awaiter(this, void 0, Promise, function* () {
            return yield driver_1.driver.get(url);
        });
    }
};
__decorate([
    index_1.given(helpers_1.pattern([
        /^открыт.? (.*)$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', Promise)
], Navigation.prototype, "onPage", null);
__decorate([
    index_1.when(helpers_1.pattern([
        /обновить страницу/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], Navigation.prototype, "reloadPage", null);
__decorate([
    index_1.when(helpers_1.pattern([
        /^перейти (?:на|в) (.*)$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', Promise)
], Navigation.prototype, "navigateToPage", null);
__decorate([
    index_1.when(helpers_1.pattern([
        /^дождаться перехода (?:на|в) (.*)$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', Promise)
], Navigation.prototype, "afterUrlChange", null);
__decorate([
    index_1.then(/^should be a transition to (.*)$/),
    index_1.then(/^должен произойти переход (?:на|в) (.*)$/), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', Promise)
], Navigation.prototype, "urlShouldBe", null);
Navigation = __decorate([
    index_1.binding(), 
    __metadata('design:paramtypes', [])
], Navigation);
module.exports = Navigation;
