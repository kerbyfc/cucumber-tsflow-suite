'use strict';

export interface WorkspaceInfo {
    path: string;
    disposeFunc: Function;
}

/**
 * Workspace to store temp files
 */
export class TypeScriptWorkspace {
    private workspace: WorkspaceInfo;

    public setWorkspace(workspace: WorkspaceInfo): void {
        this.workspace = workspace;
    }

    public dispose(): void {
        if (!this.workspace) {
            return;
        }
        this.workspace.disposeFunc();
    }
}
