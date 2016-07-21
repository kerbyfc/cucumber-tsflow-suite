'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (stepDefinitions) {
    var groupedStepDefintions = _lodash2.default.groupBy(stepDefinitions, 'file');
    var title = 'Step Dictionary';
    var cssFiles = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'];
    var jsImports = ['https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js'];

    var cssBlock = cssFiles.map(function (location) {
        return '<link rel="stylesheet" type="text/css" href="' + location + '">';
    }).join('\n');

    var jsBlock = jsImports.map(function (location) {
        return '<script src="' + location + '"></script>';
    }).join('\n');

    var inlineCSS = '\n    #filter {\n      width: 100%;\n      font-size: 18pt;\n      padding: 10px;\n      background-color: #F0F0F0;\n      border: 1px solid #CCC;\n      color: #0088B5;\n    }\n    .filename-header {\n      font-size: 13pt;\n    }\n    .step-defintion {\n      padding: 20px 5px;\n    }\n    .label {\n      color: #000;\n    }\n    .form-group, .controls, .footer {\n      padding: 20px 0;\n    }\n    .fileToggleButton {\n      float: left;\n      position: relative;\n      margin-right: 10px;\n      border: 1px solid #CCC;\n      background-color: #FFF;\n      font-size: 8pt;\n      color: #AAA;\n    }\n    .fileToggleButton:hover {\n      border: 1px solid #777;\n      color: #333;\n    }\n    .footer {\n      font-size: 10pt;\n    }\n  ';

    var header = '\n    <h1> Step Dictionary </h1>\n    <div class="form-group">\n      <label for="filter">Search by phrase</label>\n      <input type="text" id="filter" placeholder="">\n    </div>\n  ';

    var filesBlock = '';
    _lodash2.default.forIn(groupedStepDefintions, function (steps, file) {
        var stepsBlock = steps.map(function (step) {
            return '\n        <dl class="dl-horizontal step-definition" regex="' + encodeURIComponent(step.regex) + '">\n          <dt>Regex</dt>\n          <dd>' + step.regex + '</dd>\n          <dt>Keyword</dt>\n          <dd>' + step.keyword + '</dd>\n          <dt>Parameters</dt>\n          <dd>' + step.params + '</dd>\n          <dt>URI</dt>\n          <dd>' + _path2.default.basename(file) + ':' + step.line + '</dd>\n        </dl>\n      ';
        }).join(' ');
        filesBlock += '\n      <div class="file-block">\n        <input type="button" class="fileToggleButton" onClick="toggleDefinitions(this)" value="Toggle">\n        <p class="filename-header">\n          ' + _path2.default.relative(process.cwd(), file) + '\n        </p>\n        <div class="definitions">\n          ' + stepsBlock + '\n        </div>\n      </div>\n    ';
    });

    var filterScript = '\n    <script>\n      $(\'#filter\').bind(\'propertychange change click keyup input paste\', function(e) {\n        var newValue = e.currentTarget.value;\n        $(\'.step-definition\').each(function(elem) {\n          var regexString = decodeURIComponent(this.getAttribute(\'regex\'));\n          var searchFilter = newValue.replace(/ +/g, \'.*\').replace(/".*"/, \'".*"\');\n          var matchDefinition = new RegExp(searchFilter);\n          if (!matchDefinition.test(regexString)) {\n            this.style.display = \'none\';\n          } else {\n            this.style.display = \'block\';\n          }\n        });\n\n        $(\'.file-block\').each(function() {\n          var noneFound = true;\n          $(this).find(\'.step-definition\').each(function() {\n            var regexString = decodeURIComponent(this.getAttribute(\'regex\'));\n            var searchFilter = newValue.replace(/ +/g, \'.*\').replace(/".*"/, \'".*"\');\n            var matchDefinition = new RegExp(searchFilter);\n            if (!matchDefinition.test(regexString)) {\n              this.style.display = \'none\';\n            } else {\n              noneFound = false;\n              this.style.display = \'block\';\n            }\n          });\n          console.log(\'nf: \' + noneFound);\n          if (noneFound) {\n            this.style.display = \'none\';\n          } else {\n            this.style.display = \'block\';\n          }\n        });\n      });\n    </script>\n  ';

    var toggleScripts = '\n    <script>\n      function toggleDefinitions(elem) {\n        var definitions = $(elem).siblings()[1];\n        $(definitions).toggle();\n      }\n\n      function toggleAll(action) {\n        if (action === \'collapse\') {\n          $(\'.definitions\').css(\'display\', \'none\');\n          $(\'#toggleAll\').text(\'Show All\');\n          $(\'#toggleAll\').attr("href", "javascript:toggleAll(\'show\')");\n        } else {\n          $(\'.definitions\').css(\'display\', \'block\');\n          $(\'#toggleAll\').text(\'Collapse All\');\n          $(\'#toggleAll\').attr("href", "javascript:toggleAll(\'collapse\')");\n        }\n      }\n    </script>\n  ';

    var mainBody = '\n    <div class="controls">\n      Available step definitions (' + stepDefinitions.length + '):\n      <a href="javascript:toggleAll(\'collapse\')" id="toggleAll"> Collapse All </a>\n    </div>\n    ' + filesBlock + '\n    ' + filterScript + '\n    ' + toggleScripts + '\n  ';

    var footer = '\n    <div class="footer">\n      This report was generated by the template defined in step-dictionary@' + _package2.default.version + '\n    </div>\n  ';

    return '\n    <html>\n      <head>\n        <title>\n          ' + title + '\n        </title>\n        ' + cssBlock + '\n        ' + jsBlock + '\n        <style>\n          ' + inlineCSS + '\n        </style>\n      </head>\n      <body>\n        <div class="container">\n          ' + header + '\n          ' + mainBody + '\n          ' + footer + '\n        </div>\n      </body>\n    </html>\n  ';
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }