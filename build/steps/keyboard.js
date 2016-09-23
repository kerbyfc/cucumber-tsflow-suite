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
const index_1 = require('cucumber-tsflow/dist/index');
const ElementsStepSet = require('./elements');
const helpers_1 = require('../support/helpers');
let KeyboardStepSet = class KeyboardStepSet extends ElementsStepSet {
    /**
     * @param selector
     * @param value
     */
    fillInput(selector, value) {
        return __awaiter(this, void 0, Promise, function* () {
            const input = yield this.getElement(selector);
            return yield this.driver.actions()
                .click(input)
                .sendKeys(value)
                .perform();
        });
    }
};
__decorate([
    index_1.when(helpers_1.pattern([
        // /^ввести в (.*?(?= (?:текст|цифр.?|значение)| ')).*'([^']*)'$/
        /^ввести в (.*) (?:значение|текст|число) '(.*)'$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String, String]), 
    __metadata('design:returntype', Promise)
], KeyboardStepSet.prototype, "fillInput", null);
KeyboardStepSet = __decorate([
    index_1.binding(), 
    __metadata('design:paramtypes', [])
], KeyboardStepSet);
module.exports = KeyboardStepSet;
