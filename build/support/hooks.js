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
const fs = require('fs');
const tmp = require('tmp');
const cucumber_tsflow_1 = require('cucumber-tsflow');
const driver_1 = require('../support/driver');
const workspace_1 = require('./workspace');
let Hooks = class Hooks {
    constructor(workspace) {
        this.workspace = workspace;
    }
    beforeScenario() {
        return __awaiter(this, void 0, Promise, function* () {
            let tempDirInfo = yield this.createTemporaryDirectoryAsync();
            this.workspace.setWorkspace(tempDirInfo);
        });
    }
    // TODO: argument types, accumulate streams and make report
    takeScreenShotOnFail(scenario, callback) {
        if (scenario.isFailed()) {
            driver_1.driver.takeScreenshot().then((stream) => {
                scenario.attach(stream, 'image/png', callback);
                fs.writeFileSync('error.html', `<img src="data:image/png;base64,${stream}"/>`);
                callback();
            }, (err) => {
                callback(err);
            });
        }
        else {
            callback();
        }
    }
    /**
     * An asynchronous wrapper around tmp.dir().
     */
    createTemporaryDirectoryAsync() {
        return __awaiter(this, void 0, Promise, function* () {
            return new Promise((resolve, reject) => {
                tmp.dir({ unsafeCleanup: true }, (error, path, cleanupAction) => {
                    if (error) {
                        reject(error);
                    }
                    resolve({ path: path, disposeFunc: cleanupAction });
                });
            });
        });
    }
};
__decorate([
    cucumber_tsflow_1.before('requireTempDir'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], Hooks.prototype, "beforeScenario", null);
__decorate([
    cucumber_tsflow_1.after(), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object, Object]), 
    __metadata('design:returntype', void 0)
], Hooks.prototype, "takeScreenShotOnFail", null);
Hooks = __decorate([
    cucumber_tsflow_1.binding([
        workspace_1.TypeScriptWorkspace
    ]), 
    __metadata('design:paramtypes', [workspace_1.TypeScriptWorkspace])
], Hooks);
module.exports = Hooks;
