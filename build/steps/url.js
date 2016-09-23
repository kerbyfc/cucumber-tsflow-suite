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
var uri = require('urijs');
/* tslint:enable */
var Promise = webdriver.promise.Promise;
var index_1 = require('cucumber-tsflow/dist/index');
var StepSet = require('../support/stepset');
var helpers_1 = require('../support/helpers');
var UrlStepSet = function (_StepSet) {
    _inherits(UrlStepSet, _StepSet);

    function UrlStepSet() {
        var _Object$getPrototypeO;

        _classCallCheck(this, UrlStepSet);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UrlStepSet)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.hashParams = /(\?|\&)([^=]+)\=([^&]+)/;
        return _this;
    }

    _createClass(UrlStepSet, [{
        key: "addGetParameter",
        value: function addGetParameter(name, value) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var url;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.getCurrentUrl();

                            case 2:
                                url = _context.sent;

                                url.addSearch(name, value);
                                _context.next = 6;
                                return this.pushState(url.href());

                            case 6:
                                return _context.abrupt("return", _context.sent);

                            case 7:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "addHashParametr",
        value: function addHashParametr(name, value) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
                var url, hash;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.getCurrentUrl();

                            case 2:
                                url = _context2.sent;
                                hash = [url.hash(), name + "=" + value];

                                url.hash(hash.join(this.hashParams.test(hash[0]) ? '&' : ''));
                                _context2.next = 7;
                                return this.pushState(url.href());

                            case 7:
                                return _context2.abrupt("return", _context2.sent);

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "getCurrentUrl",
        value: function getCurrentUrl() {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.driver.getCurrentUrl();

                            case 2:
                                _context3.t0 = _context3.sent;
                                return _context3.abrupt("return", uri(_context3.t0));

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "pushState",
        value: function pushState(url, title) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!(title === void 0)) {
                                    _context4.next = 4;
                                    break;
                                }

                                _context4.next = 3;
                                return this.driver.getTitle();

                            case 3:
                                title = _context4.sent;

                            case 4:
                                return _context4.abrupt("return", this.driver.executeScript("window.history.pushState({}, '" + title + "', '" + url + "');"));

                            case 5:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }]);

    return UrlStepSet;
}(StepSet);
__decorate([index_1.when(helpers_1.pattern([/^добавить get-параметр (.*) со значением (.*)$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String, String]), __metadata('design:returntype', Promise)], UrlStepSet.prototype, "addGetParameter", null);
__decorate([index_1.when(/^добавить hash-параметр (.*) со значением (.*)$/), __metadata('design:type', Function), __metadata('design:paramtypes', [String, String]), __metadata('design:returntype', Promise)], UrlStepSet.prototype, "addHashParametr", null);
UrlStepSet = __decorate([index_1.binding(), __metadata('design:paramtypes', [])], UrlStepSet);
module.exports = UrlStepSet;