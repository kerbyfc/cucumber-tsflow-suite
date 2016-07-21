'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _generateReport = require('./generate-report');

var _generateReport2 = _interopRequireDefault(_generateReport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function StepDictionary(pathArg) {
        _classCallCheck(this, StepDictionary);

        this.paths = this._getAllPaths(pathArg);
        this.stepDefinitions = this._getStepDefinitions();
    }

    _createClass(StepDictionary, [{
        key: 'getStepsJson',
        value: function getStepsJson() {
            return this.stepDefinitions;
        }
    }, {
        key: 'getStepThatMatches',
        value: function getStepThatMatches(phrase) {
            return this.stepDefinitions.filter(function (stepDef) {
                return stepDef.regex.test(phrase);
            });
        }
    }, {
        key: 'outputReport',
        value: function outputReport(outputPath) {
            var report = (0, _generateReport2.default)(this.stepDefinitions);
            _fs2.default.writeFileSync(outputPath, report);
        }
    }, {
        key: '_getStepDefinitions',
        value: function _getStepDefinitions() {
            var stepDefinitions = [];

            this.paths.forEach(function (filePath) {
                var fileData = void 0;

                try {
                    fileData = _fs2.default.readFileSync(filePath, { encoding: 'utf8' });
                } catch (e) {
                    console.log(_path2.default + ' could not be read, will skip and continue', e);
                }

                if (fileData) {
                    var re = /@(given|then)\(\s*\/\^(.*)\$\/\).*\n*.*\((.*)\)/g,
                        definition;
                    while ((definition = re.exec(fileData)) !== null) {
                        stepDefinitions.push({
                            keyword: definition[1],
                            regex: definition[2],
                            params: definition[3],
                            file: filePath,
                            line: fileData.slice(0, definition.index).split(/\n/).length
                        });
                    }
                }
            });

            return stepDefinitions;
        }
    }, {
        key: '_getAllPaths',
        value: function _getAllPaths(pathArg) {
            var paths = typeof pathArg === 'string' ? [pathArg] : pathArg;
            return _lodash2.default.flattenDeep(paths.map(function (filePath) {
                if (_path2.default.parse(filePath).ext) {
                    return _path2.default.resolve(filePath);
                } else {
                    return _glob2.default.sync(_path2.default.join(filePath, '**', '*.ts'));
                }
            }));
        }
    }]);

    return StepDictionary;
}();