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
var index_1 = require('cucumber-tsflow/dist/index');
var ElementsStepSet = require('./elements');
var helpers_1 = require('../support/helpers');
var KeyboardStepSet = function (_ElementsStepSet) {
    _inherits(KeyboardStepSet, _ElementsStepSet);

    function KeyboardStepSet() {
        _classCallCheck(this, KeyboardStepSet);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(KeyboardStepSet).apply(this, arguments));
    }

    _createClass(KeyboardStepSet, [{
        key: "fillInput",

        /**
         * @param selector
         * @param value
         */
        value: function fillInput(selector, value) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var input;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.getElement(selector);

                            case 2:
                                input = _context.sent;
                                _context.next = 5;
                                return this.driver.actions().click(input).sendKeys(value).perform();

                            case 5:
                                return _context.abrupt("return", _context.sent);

                            case 6:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return KeyboardStepSet;
}(ElementsStepSet);
__decorate([index_1.when(helpers_1.pattern([
// /^ввести в (.*?(?= (?:текст|цифр.?|значение)| ')).*'([^']*)'$/
/^ввести в (.*) (?:значение|текст|число) '(.*)'$/])), __metadata('design:type', Function), __metadata('design:paramtypes', [String, String]), __metadata('design:returntype', Promise)], KeyboardStepSet.prototype, "fillInput", null);
KeyboardStepSet = __decorate([index_1.binding(), __metadata('design:paramtypes', [])], KeyboardStepSet);
module.exports = KeyboardStepSet;