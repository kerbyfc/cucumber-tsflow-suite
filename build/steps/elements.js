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
// noinspection ES6UnusedImports
var selenium_webdriver_1 = require('selenium-webdriver');
//noinspection TypeScriptUnresolvedVariable
var Promise = selenium_webdriver_1.promise.Promise;
var index_1 = require('cucumber-tsflow/dist/index');
var StepSet = require('../support/stepset');
var helpers_1 = require('../support/helpers');
/*
 * Поддержка операций с элементами
 */
var ElementsStepSet = function (_StepSet) {
    _inherits(ElementsStepSet, _StepSet);

    function ElementsStepSet() {
        _classCallCheck(this, ElementsStepSet);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ElementsStepSet).apply(this, arguments));
    }

    _createClass(ElementsStepSet, [{
        key: "checkElementInnerHtml",
        value: function checkElementInnerHtml(selector, expectedHtml) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var html;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.getElementInnerHtml(selector);

                            case 2:
                                html = _context.sent;

                                if (!(html.trim() !== expectedHtml.trim())) {
                                    _context.next = 5;
                                    break;
                                }

                                throw new Error("'" + html + "' ≠ '" + expectedHtml + "'");

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "shouldBeEmpty",
        value: function shouldBeEmpty(selector) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
                var html;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.getElementInnerHtml(selector);

                            case 2:
                                html = _context2.sent;

                                if (!(html.trim() !== '')) {
                                    _context2.next = 5;
                                    break;
                                }

                                throw new Error("'" + selector + "' содержит '" + html.slice(0, 100) + "'");

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "checkChildrenCount",
        value: function checkChildrenCount(container, count, children) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee3() {
                var elements;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.getElements(container + " > " + children);

                            case 2:
                                elements = _context3.sent;

                                if (elements.length) {
                                    _context3.next = 5;
                                    break;
                                }

                                throw new Error("'" + container + "' не содержит " + children);

                            case 5:
                                if (!(elements.length !== +count)) {
                                    _context3.next = 7;
                                    break;
                                }

                                throw new Error("'" + container + "' содержит " + elements.length + " '" + children + "' а не " + count);

                            case 7:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "getElementInnerHtml",
        value: function getElementInnerHtml(selector) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee4() {
                var element;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.getElement(selector);

                            case 2:
                                element = _context4.sent;
                                return _context4.abrupt("return", element.getInnerHtml());

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
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

    }, {
        key: "getElements",
        value: function getElements(selector) {
            var _this2 = this;

            var timeout = arguments.length <= 1 || arguments[1] === undefined ? this.timeout : arguments[1];

            /**
             * Пробуем получить именованный селектор
             */
            // selector = this.getNamedSelector(selector) || selector;
            return this.actor({
                invoke: function invoke() {
                    return _this2.driver.findElements(selenium_webdriver_1.By.css(selector));
                },
                until: function until(elements) {
                    return elements.length > 0;
                },
                otherwise: function otherwise() {
                    throw new Error("Элемент(ы) '" + selector + "' не найден(ы) на странице");
                },
                during: timeout,
                every: this.interval
            });
        }
    }, {
        key: "getElement",
        value: function getElement(selector) {
            var _this3 = this;

            var timeout = arguments.length <= 1 || arguments[1] === undefined ? this.timeout : arguments[1];

            return new Promise(function (resolve) {
                return __awaiter(_this3, void 0, void 0, regeneratorRuntime.mark(function _callee5() {
                    var elements;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.next = 2;
                                    return this.getElements(selector, timeout);

                                case 2:
                                    elements = _context5.sent;

                                    // TODO: warning if element if not unique
                                    resolve(elements[0]);

                                case 4:
                                case "end":
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this);
                }));
            });
        }
    }, {
        key: "timeout",
        get: function get() {
            return 5000;
        }
    }, {
        key: "interval",
        get: function get() {
            return 300;
        }
    }]);

    return ElementsStepSet;
}(StepSet);
ElementsStepSet.map = {};
__decorate([index_1.then(helpers_1.pattern([/^содержимое (.*) должно быть '([^']*)'$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String, String]), __metadata('design:returntype', Promise)], ElementsStepSet.prototype, "checkElementInnerHtml", null);
__decorate([index_1.then(helpers_1.pattern([/^(.*) долж(?:ен|на) быть пуст(?:ым|ой)$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String]), __metadata('design:returntype', Promise)], ElementsStepSet.prototype, "shouldBeEmpty", null);
__decorate([index_1.then(helpers_1.pattern([/^(.*) долж(?:ен|на) содержать (\d+) (.*)$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String, Number, String]), __metadata('design:returntype', Promise)], ElementsStepSet.prototype, "checkChildrenCount", null);
ElementsStepSet = __decorate([index_1.binding(), __metadata('design:paramtypes', [])], ElementsStepSet);
module.exports = ElementsStepSet;