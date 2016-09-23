///<reference path="../../typings/custom/index.d.ts" />
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
var jsdiff = require('diff');
require('colors');
/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
var webdriver = require('selenium-webdriver');
var Promise = webdriver.promise.Promise;
var index_1 = require('cucumber-tsflow/dist/index');
var driver_1 = require('./driver');
var helpers_1 = require('./helpers');
var StepSet = function () {
    function StepSet() {
        _classCallCheck(this, StepSet);
    }

    _createClass(StepSet, [{
        key: "awaitXSeconds",

        // TODO: separate
        value: function awaitXSeconds(seconds, callback) {
            setTimeout(callback, seconds * 1000);
        }
    }, {
        key: "log",
        value: function log() {
            if (this.debug) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                console.log.apply(console, ['     '].concat(args));
            }
        }
        // TODO: create class

    }, {
        key: "actor",
        value: function actor(action) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
                var _this = this;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt("return", new Promise(function (resolve) {
                                    var result = void 0;
                                    if (!action.during) {
                                        action.during = 5010;
                                    }
                                    if (!action.every) {
                                        action.every = 1000;
                                    }
                                    var timer = setTimeout(function () {
                                        clearInterval(loop);
                                        action.otherwise(result);
                                    }, action.during);
                                    var loop = setInterval(function () {
                                        return __awaiter(_this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            _context.next = 2;
                                                            return action.invoke();

                                                        case 2:
                                                            result = _context.sent;

                                                            if (action.until(result)) {
                                                                clearInterval(loop);
                                                                clearTimeout(timer);
                                                                resolve(result);
                                                            }

                                                        case 4:
                                                        case "end":
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, this);
                                        }));
                                    }, action.every);
                                }));

                            case 1:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "diff",
        value: function diff(text, other) {
            var before = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
            var after = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

            var diff = jsdiff.diffChars(text, other);
            var out = [];
            diff.forEach(function (part) {
                var color = part.added ? 'green' : part.removed ? 'red' : 'black';
                out.push(part.value[color]);
            });
            return before['black'] + out.join('') + after['black'];
        }
    }, {
        key: "driver",
        get: function get() {
            return driver_1.driver;
        }
    }, {
        key: "debug",
        get: function get() {
            return process.env.DEBUG;
        }
    }]);

    return StepSet;
}();
__decorate([index_1.given(helpers_1.pattern([/^подождать (\d+) секунд.?$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [Number, Object]), __metadata('design:returntype', void 0)], StepSet.prototype, "awaitXSeconds", null);
StepSet = __decorate([index_1.binding(), __metadata('design:paramtypes', [])], StepSet);
module.exports = StepSet;