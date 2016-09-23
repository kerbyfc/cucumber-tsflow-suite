'use strict';
/**
 * Workspace to store temp files
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TypeScriptWorkspace = function () {
    function TypeScriptWorkspace() {
        _classCallCheck(this, TypeScriptWorkspace);
    }

    _createClass(TypeScriptWorkspace, [{
        key: 'setWorkspace',
        value: function setWorkspace(workspace) {
            this.workspace = workspace;
        }
        // noinspection JSUnusedGlobalSymbols

    }, {
        key: 'dispose',
        value: function dispose() {
            if (!this.workspace) {
                return;
            }
            this.workspace.disposeFunc();
        }
    }]);

    return TypeScriptWorkspace;
}();

exports.TypeScriptWorkspace = TypeScriptWorkspace;