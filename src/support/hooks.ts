'use strict';

import * as fs from 'fs';
import * as tmp from 'tmp';
import {binding, before, after} from 'cucumber-tsflow';

import {driver} from '../support/driver';
import {TypeScriptWorkspace, WorkspaceInfo} from './workspace';

@binding([
    TypeScriptWorkspace
])
class Hooks {
    constructor(protected workspace: TypeScriptWorkspace) {
    }

    @before('requireTempDir')
    public async beforeScenario(): Promise<void> {
        let tempDirInfo = await this.createTemporaryDirectoryAsync();
        this.workspace.setWorkspace(tempDirInfo);
    }

    // TODO: argument types, accumulate streams and make report
    @after()
    protected takeScreenShotOnFail(scenario: any, callback: any): void {
        if (scenario.isFailed()) {
            driver.takeScreenshot().then((stream) => {
                scenario.attach(stream, 'image/png', callback);
                fs.writeFileSync('error.html', `<img src="data:image/png;base64,${stream}"/>`);
                callback();
            }, (err) => {
                callback(err);
            });
        } else {
            callback();
        }
    }

    /**
     * An asynchronous wrapper around tmp.dir().
     */
    private async createTemporaryDirectoryAsync(): Promise<WorkspaceInfo> {
        return new Promise<WorkspaceInfo>((resolve, reject) => {
            tmp.dir({ unsafeCleanup: true }, (error, path, cleanupAction) => {
                if (error) {
                    reject(error);
                }
                resolve({ path: path, disposeFunc: cleanupAction });
            });
        });
    }
}

export = Hooks;
