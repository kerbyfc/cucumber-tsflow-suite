'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
/* tslint:disable:no-unused-variable */
// noinspection ES6UnusedImports
var webdriver = require('selenium-webdriver');
/* tslint:enable */
var driver_1 = require('../support/driver');
var Promise = webdriver.promise.Promise;
var index_1 = require('cucumber-tsflow/dist/index');
var StepSet = require('../support/stepset');
var helpers_1 = require('../support/helpers');
var Navigation = function (_StepSet) {
    _inherits(Navigation, _StepSet);

    function Navigation() {
        _classCallCheck(this, Navigation);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Navigation).apply(this, arguments));
    }

    _createClass(Navigation, [{
        key: "reloadPage",
        value: function reloadPage() {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return driver_1.driver.navigate().refresh();

                            case 2:
                                return _context.abrupt("return", _context.sent);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "onPage",
        value: function onPage(url) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.navigateToUrl(url);

                            case 2:
                                return _context2.abrupt("return", _context2.sent);

                            case 3:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "navigateToPage",
        value: function navigateToPage(url) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.navigateToUrl(url);

                            case 2:
                                return _context3.abrupt("return", _context3.sent);

                            case 3:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "afterUrlChange",
        value: function afterUrlChange(url) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee4() {
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.waitForUrlChange(url, function (currentUrl) {
                                    var diff = _this2.diff(currentUrl, url, '(', ')');
                                    throw new Error("Время ожидания " + url + " истекло " + diff);
                                });

                            case 2:
                                return _context4.abrupt("return", _context4.sent);

                            case 3:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "urlshouldbe",
        value: function urlshouldbe(url) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee5() {
                var _this3 = this;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.waitForUrlChange(url, function (currentUrl) {
                                    var diff = _this3.diff(url, currentUrl, '(', ')');
                                    throw new Error("Текущая страница " + currentUrl + " ≠ " + url + ". " + diff);
                                });

                            case 2:
                                return _context5.abrupt("return", _context5.sent);

                            case 3:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: "waitForUrlChange",
        value: function waitForUrlChange(url, otherwise) {
            var re = new RegExp(url);
            return this.actor({
                invoke: function invoke() {
                    return driver_1.driver.getCurrentUrl();
                },
                until: function until(currentUrl) {
                    return re.test(currentUrl);
                },
                during: 15000,
                otherwise: otherwise
            });
        }
    }, {
        key: "navigateToUrl",
        value: function navigateToUrl(url) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return driver_1.driver.get(url);

                            case 2:
                                return _context6.abrupt("return", _context6.sent);

                            case 3:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
    }]);

    return Navigation;
}(StepSet);
__decorate([index_1.when(helpers_1.pattern([/обновить страницу/])), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', Promise)], Navigation.prototype, "reloadPage", null);
__decorate([index_1.given(helpers_1.pattern([/^открыт.? (.*)$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String]), __metadata('design:returntype', Promise)], Navigation.prototype, "onPage", null);
__decorate([index_1.when(helpers_1.pattern([/^перейти (?:на|в) (.*)$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String]), __metadata('design:returntype', Promise)], Navigation.prototype, "navigateToPage", null);
__decorate([index_1.when(helpers_1.pattern([/^дождаться перехода (?:на|в) (.*)$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String]), __metadata('design:returntype', Promise)], Navigation.prototype, "afterUrlChange", null);
__decorate([index_1.then(helpers_1.pattern([/^должен произойти переход (?:на|в) (.*)$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String]), __metadata('design:returntype', Promise)], Navigation.prototype, "urlshouldbe", null);
Navigation = __decorate([index_1.binding(), __metadata('design:paramtypes', [])], Navigation);
module.exports = Navigation;