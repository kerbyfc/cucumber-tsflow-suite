import Elements = require('./elements');

import {
    binding,
    when
} from 'cucumber-tsflow';
import WebElement = webdriver.WebElement;

@binding()
class Inputs extends Elements {

    /**
     * @param selector
     * @param value
     */
    @when(/^ввести в (.*?(?= (?:текст|цифр.?|значение)| ')).*'([^']*)'$/)
    public async fillInput(selector: string, value: string): Promise<void> {
        const input: WebElement = await this.getElement(selector);
        await this.driver.actions()
            .click(input)
            .sendKeys(value)
            .perform();
    }

}

export = Inputs;
