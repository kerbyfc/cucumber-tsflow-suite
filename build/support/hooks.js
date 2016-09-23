'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var fs = require('fs');
var tmp = require('tmp');
var cucumber_tsflow_1 = require('cucumber-tsflow');
var driver_1 = require('../support/driver');
var workspace_1 = require('./workspace');
var Hooks = function () {
    function Hooks(workspace) {
        _classCallCheck(this, Hooks);

        this.workspace = workspace;
    }

    _createClass(Hooks, [{
        key: "beforeScenario",
        value: function beforeScenario() {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var tempDirInfo;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.createTemporaryDirectoryAsync();

                            case 2:
                                tempDirInfo = _context.sent;

                                this.workspace.setWorkspace(tempDirInfo);

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        // TODO: argument types, accumulate streams and make report

    }, {
        key: "takeScreenShotOnFail",
        value: function takeScreenShotOnFail(scenario, callback) {
            if (scenario.isFailed()) {
                driver_1.driver.takeScreenshot().then(function (stream) {
                    scenario.attach(stream, 'image/png', callback);
                    fs.writeFileSync('error.html', "<img src=\"data:image/png;base64," + stream + "\"/>");
                    callback();
                }, function (err) {
                    callback(err);
                });
            } else {
                callback();
            }
        }
        /**
         * An asynchronous wrapper around tmp.dir().
         */

    }, {
        key: "createTemporaryDirectoryAsync",
        value: function createTemporaryDirectoryAsync() {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                                    tmp.dir({ unsafeCleanup: true }, function (error, path, cleanupAction) {
                                        if (error) {
                                            reject(error);
                                        }
                                        resolve({ path: path, disposeFunc: cleanupAction });
                                    });
                                }));

                            case 1:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }]);

    return Hooks;
}();
__decorate([cucumber_tsflow_1.before('requireTempDir'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', Promise)], Hooks.prototype, "beforeScenario", null);
__decorate([cucumber_tsflow_1.after(), __metadata('design:type', Function), __metadata('design:paramtypes', [Object, Object]), __metadata('design:returntype', void 0)], Hooks.prototype, "takeScreenShotOnFail", null);
Hooks = __decorate([cucumber_tsflow_1.binding([workspace_1.TypeScriptWorkspace]), __metadata('design:paramtypes', [workspace_1.TypeScriptWorkspace])], Hooks);
module.exports = Hooks;