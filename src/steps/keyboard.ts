'use strict';

import ElementsStepSet = require('./elements');
import {binding, when} from 'cucumber-tsflow';
import WebElement = webdriver.WebElement;

@binding()
class KeyboardStepSet extends ElementsStepSet {

    /**
     * @param selector
     * @param value
     */
    @when(/^ввести в (.*?(?= (?:текст|цифр.?|значение)| ')).*'([^']*)'$/)
    public async fillInput(selector: string, value: string): Promise<void> {
        const input: WebElement = await this.getElement(selector);
        return await this.driver.actions()
            .click(input)
            .sendKeys(value)
            .perform();
    }

}

export = KeyboardStepSet;
