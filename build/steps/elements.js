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
// noinspection ES6UnusedImports
const selenium_webdriver_1 = require('selenium-webdriver');
var Promise = selenium_webdriver_1.promise.Promise;
const index_1 = require('cucumber-tsflow/dist/index');
const StepSet = require('../support/stepset');
const helpers_1 = require('../support/helpers');
/*
 * Поддержка операций с элементами
 */
let ElementsStepSet = class ElementsStepSet extends StepSet {
    get timeout() {
        return 5000;
    }
    get interval() {
        return 300;
    }
    checkElementInnerHtml(selector, expectedHtml) {
        return __awaiter(this, void 0, Promise, function* () {
            const html = yield this.getElementInnerHtml(selector);
            /**
             * Посимвольно сравнениваем фактическое содержимое с ожидаемым
             * @note Не стоит сравнивать много данных, это затруднит поддержку
             */
            if (html.trim() !== expectedHtml.trim()) {
                throw new Error(`'${html}' ≠ '${expectedHtml}'`);
            }
        });
    }
    shouldBeEmpty(selector) {
        return __awaiter(this, void 0, Promise, function* () {
            const html = yield this.getElementInnerHtml(selector);
            if (html.trim() !== '') {
                throw new Error(`'${selector}' содержит '${html.slice(0, 100)}'`);
            }
        });
    }
    getElementInnerHtml(selector) {
        return __awaiter(this, void 0, Promise, function* () {
            const element = yield this.getElement(selector);
            return element.getInnerHtml();
        });
    }
    /**
     * @note если нужно проверить есть ли элемент на странице,
     * можно использовать флаг false вторым аргументом
     *
     * @example кликаем на элемент если он есть
     *      async () => {
     *        const elements: WebElement[] = await this.getElements('blah', false);
     *        if (!elements) {
     *          callback(); // ничего не делаем
     *        }
     *      }
     */
    getElements(selector, timeout = this.timeout) {
        /**
         * Пробуем получить именованный селектор
         */
        // selector = this.getNamedSelector(selector) || selector;
        return this.actor({
            invoke: () => this.driver.findElements(selenium_webdriver_1.By.css(selector)),
            until: (elements) => elements.length > 0,
            otherwise: () => {
                throw new Error(`Элемент(ы) '${selector}' не найден(ы) на странице`);
            },
            during: timeout,
            every: this.interval
        });
    }
    getElement(selector, timeout = this.timeout) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const elements = yield this.getElements(selector, timeout);
            // TODO: warning if element if not unique
            resolve(elements[0]);
        }));
    }
};
ElementsStepSet.map = {};
__decorate([
    index_1.then(helpers_1.pattern([
        /^содержимое (.*) должно быть '([^']*)'$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String, String]), 
    __metadata('design:returntype', Promise)
], ElementsStepSet.prototype, "checkElementInnerHtml", null);
__decorate([
    index_1.then(helpers_1.pattern([
        /^(.*) долж(?:ен|на) быть пуст(?:ым|ой)$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', Promise)
], ElementsStepSet.prototype, "shouldBeEmpty", null);
ElementsStepSet = __decorate([
    index_1.binding(), 
    __metadata('design:paramtypes', [])
], ElementsStepSet);
module.exports = ElementsStepSet;
