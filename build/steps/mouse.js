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
/**
 * Поддержка операций с элементами
 */
let MouseStepSet = class MouseStepSet extends ElementsStepSet {
    click(selector) {
        return __awaiter(this, void 0, Promise, function* () {
            const element = yield this.getElement(selector);
            return this.driver.actions().click(element).perform();
        });
    }
};
__decorate([
    index_1.when(helpers_1.pattern([
        /^кликнуть (?:на|по) (.*)$/
    ])), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', Promise)
], MouseStepSet.prototype, "click", null);
MouseStepSet = __decorate([
    index_1.binding(), 
    __metadata('design:paramtypes', [])
], MouseStepSet);
module.exports = MouseStepSet;
