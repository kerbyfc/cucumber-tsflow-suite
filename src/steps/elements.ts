///<reference path="../../typings/custom/index.d.ts" />

'use strict';

import 'string_score';
import {
    binding,
    given
} from 'cucumber-tsflow';

import {driver} from '../support/driver';
import * as _ from 'lodash';

// noinspection ES6UnusedImports
import
{
    By,
    promise,
    WebElement
} from 'selenium-webdriver';

import Promise = promise.Promise;

/**
 * Поддержка операций с элементами
 */
@binding()
class Elements {

    protected elements: {} = {};

    @given(/^элементы:?$/)
    public setElements(table: ITable): void {
        this.elements = table.rowsHash();
    }

    @given(/^кликнуть на (.*)$/)
    public async click(selector: string): Promise<void> {
        await this.doClick(selector);
    }

    @given(/^попробовать кликнуть на '([^']*)'$/)
    public async tryClick(selector: string): Promise<void> {
        await this.doClick(selector, false);
    }

    /**
     * @param selector
     * @param value
     */
    @given(/^заполнить поле '([^']*)' значением '([^']*)'$/)
    public async fillInput(selector: string, value: string): Promise<void> {
        const input: WebElement = await this.getElement(selector);
        await driver.actions()
            .click(input)
            .sendKeys(value)
            .perform();
    }

    @given(/^содержимое (.*) должно быть '([^']*)'$/)
    public async checkElementInnerHtml(selector: string, expectedHtml: string): Promise<void> {
        /**
         * Находим элемент и получаем его содержимое
         */
        const element: WebElement  = await this.getElement(selector);
        const html: string = await element.getInnerHtml();
        /**
         * Посимвольно сравнениваем фактическое содержимое с ожидаемым
         * @note Не стоит сравнивать много данных, это затруднит поддержку
         */
        if (html !== expectedHtml) {
            throw new Error(`${html} ≠ ${expectedHtml}`);
        }
    }

    protected async doClick(selector: string, strict: boolean = true): Promise<void> {
        const element: WebElement = await this.getElement(selector, strict);
        driver.actions().click(element).perform();
    }

    /**
     * @note если нужно проверить есть ли элемент на странице,
     * нужно использовать флаг false втором аргументом
     *
     * @example кликаем на элемент если он есть
     *      const elements: WebElement[] = this.getElements('blah', false);
     *      if (!elements) {
     *          callback(); // ничего не делаем
     *      }
     */
    protected getElements(selector: string, strict: boolean = true): Promise<WebElement[]> {
        /**
         * Пробуем получить именованный селектор
         */
        selector = this.getNamedSelector(selector) || selector;

        /**
         * Обещание не возвращается сразу, дожидаемся выполенения
         * для проверки наличия элементов на странице
         */
        return new Promise((resolve: (elements: WebElement[]) => void) => {
            driver.findElements(By.css(selector)).then((elements: WebElement[]) => {
                /**
                 *  Кидаем ошибку если нет элемента
                 */
                if (strict && !elements.length) {
                    throw new Error(`Элемент(ы) '${selector}' не найден(ы) на странице`);
                }
                /**
                 * Возвращаем элементы
                 */
                resolve(elements);
            });
        });

    }

    /**
     * Получить именованный селектор с помощью нечеткого поиска
     * @example
     *      this.elements["кнопка входа"] = ".button";
     *      this.getNamedSelector("кнопку входа") // ".button"
     */
    protected getNamedSelector(name: string): string {
        /**
         * Проверить есть ли точное совпадение
         */
        let element = this.elements[name];
        if (element) {
            return element;
        }

        let pairs = _.toPairs(this.elements);

        if (!pairs.length) {
            return;
        }

        pairs = _.map(pairs, (map) => {
            const score: number = map[0].score(name, 1);
            return map.concat([score]);
        });

        pairs = _.sortBy(pairs, (map) => _.last(map)).reverse();

        let score: number = pairs[0][2];
        if (score < 0.2) {
            throw new Error(`Используемое имя элемента '${name}' неочевидно`);
        }

        if (pairs.length > 1 && score.toFixed(1) === pairs[1][2].toFixed(1)) {
            throw new Error(
                `Используемое имя элемента '${name}' неоднозначно, 
                как и ${pairs[1][0]}`
            );
        }

        return pairs[0][1];
    }

    protected getElement(selector: string, strict: boolean = true): Promise<WebElement> {
        return new Promise(async (resolve) => {
            const elements: WebElement[] = await this.getElements(selector, strict);
            resolve(elements[0]);
        });
    }

}

export = Elements;
