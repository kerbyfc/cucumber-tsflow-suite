'use strict';

import {binding, when} from 'cucumber-tsflow/dist/index';
import ElementsStepSet = require('./elements');

/**
 * Поддержка операций с элементами
 */
@binding()
class InteractionStepSet extends ElementsStepSet {

    @when(/^кликнуть (?:на|по) (.*)$/)
    public async click(selector: string): Promise<void> {
        await this.doClick(selector);
    }

}

export = InteractionStepSet;