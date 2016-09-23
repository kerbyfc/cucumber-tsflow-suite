'use strict';
/**
 * Workspace to store temp files
 */
class TypeScriptWorkspace {
    setWorkspace(workspace) {
        this.workspace = workspace;
    }
    // noinspection JSUnusedGlobalSymbols
    dispose() {
        if (!this.workspace) {
            return;
        }
        this.workspace.disposeFunc();
    }
}
exports.TypeScriptWorkspace = TypeScriptWorkspace;
