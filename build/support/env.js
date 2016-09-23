"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const driver_1 = require('./driver');
const configure = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.setDefaultTimeout(30 * 1000);
        this.registerHandler('AfterFeatures', function (event, callback) {
            driver_1.driver.quit().then(() => callback());
            return event;
        });
    });
};
module.exports = configure;
