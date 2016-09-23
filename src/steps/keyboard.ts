'use strict';

import {binding, when} from 'cucumber-tsflow/dist/index';

import ElementsStepSet = require('./elements');
import WebElement = webdriver.WebElement;
import {pattern} from '../support/helpers';

@binding()
class KeyboardStepSet extends ElementsStepSet {

    /**
     * @param selector
     * @param value
     */
    @when(pattern([
        // /^ввести в (.*?(?= (?:текст|цифр.?|значение)| ')).*'([^']*)'$/
        /^ввести в (.*) (?:значение|текст|число) '(.*)'$/
    ]))
    public async fillInput(selector: string, value: string): Promise<void> {
        const input: WebElement = await this.getElement(selector);
        return await this.driver.actions()
            .click(input)
            .sendKeys(value)
            .perform();
    }

}

export = KeyboardStepSet;
