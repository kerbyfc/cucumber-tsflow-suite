'use strict';

import {binding, when} from '../support/decorators';
import ElementsStepSet = require('./elements');
import WebElement = webdriver.WebElement;

/**
 * Поддержка операций с элементами
 */
@binding()
class MouseStepSet extends ElementsStepSet {

    @when([
        /^кликнуть (?:на|по) (.*)$/
    ])
    public async click(selector: string): Promise<void> {
        const element: WebElement = await this.getElement(selector);
        return this.driver.actions().click(element).perform();
    }

}

export = MouseStepSet;
