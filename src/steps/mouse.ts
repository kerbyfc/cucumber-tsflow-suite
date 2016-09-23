'use strict';

import {binding, when} from 'cucumber-tsflow/dist/index';

import ElementsStepSet = require('./elements');
import WebElement = webdriver.WebElement;
import {pattern} from '../support/helpers';

/**
 * Поддержка операций с элементами
 */
@binding()
class MouseStepSet extends ElementsStepSet {

    @when(pattern([
        /^кликнуть (?:на|по) (.*)$/
    ]))
    public async click(selector: string): Promise<void> {
        const element: WebElement = await this.getElement(selector);
        this.driver.actions().click(element).perform();
    }

}

export = MouseStepSet;
