///<reference path="../../typings/custom/index.d.ts" />

'use strict';

import 'string_score';
import {
    binding,
    given,
    then,
    when
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
import Timer = NodeJS.Timer;

/**
 * Поддержка операций с элементами
 */
@binding()
class Elements {

    protected elements: {} = {};
    protected timeout: number = 5000;

    @given(/^(?:есть )элементы:?$/)
    public setElements(table: ITable): void {
        this.elements = table.rowsHash();
    }

    @when(/^кликнуть (?:на|по) (.*)$/)
    public async click(selector: string): Promise<void> {
        await this.doClick(selector);
    }

    /**
     * @param selector
     * @param value
     */
    @when(/^заполнить поле '([^']*)' значением '([^']*)'$/)
    public async fillInput(selector: string, value: string): Promise<void> {
        const input: WebElement = await this.getElement(selector);
        await driver.actions()
            .click(input)
            .sendKeys(value)
            .perform();
    }

    @then(/^содержимое (.*) должно быть '([^']*)'$/)
    public async checkElementInnerHtml(selector: string, expectedHtml: string): Promise<void> {
        const html: string = await this.getElementInnerHtml(selector);
        /**
         * Посимвольно сравнениваем фактическое содержимое с ожидаемым
         * @note Не стоит сравнивать много данных, это затруднит поддержку
         */
        if (html.trim() !== expectedHtml.trim()) {
            throw new Error(`'${html}' ≠ '${expectedHtml}'`);
        }
    }

    @then(/^(.*) долж(?:ен|на) быть пуст(?:ым|ой)$/)
    public async shouldBeEmpty(selector: string): Promise<void> {
        const html: string = await this.getElementInnerHtml(selector);
        if (html.trim() !== '') {
            throw new Error(`'${selector}' содержит '${html.slice(0, 100)}'`);
        }
    }

    protected async doClick(selector: string): Promise<void> {
        const element: WebElement = await this.getElement(selector);
        return driver.actions().click(element).perform();
    }

    protected async getElementInnerHtml(selector: string): Promise<string> {
        const element: WebElement = await this.getElement(selector);
        return element.getInnerHtml();
    }

    /**
     * @note если нужно проверить есть ли элемент на странице,
     * можно использовать флаг false вторым аргументом
     *
     * @example кликаем на элемент если он есть
     *      async () => {
     *        const elements: WebElement[] = await this.getElements('blah', false);
     *        if (!elements) {
     *          callback(); // ничего не делаем
     *        }
     *      }
     */
    protected getElements(selector: string, timeout: number = this.timeout): Promise<WebElement[]> {
        /**
         * Пробуем получить именованный селектор
         */
        selector = this.getNamedSelector(selector) || selector;

        /**
         * Обещание не возвращается сразу, дожидаемся выполенения
         * для проверки наличия элементов на странице
         */
        return new Promise((resolve: (elements: WebElement[]) => void) => {
            if (!timeout) {
                timeout = 0;
            }

            const timer: Timer = setTimeout(() => {
                /**
                 *  Кидаем ошибку если нет элемента по истечении таймера ожидания
                 */
                throw new Error(`Элемент(ы) '${selector}' не найден(ы) на странице`);
            }, timeout);

            const loop: Timer = setInterval(() => {
                driver.findElements(By.css(selector))
                    .then((elements: WebElement[]) => {
                        if (elements.length > 0) {
                            /**
                             * Возвращаем элементы
                             */
                            resolve(elements);
                        }
                    })
                    /**
                     * Сбрасываем таймеры
                     */
                    .thenFinally(() => {
                        clearInterval(loop);
                        clearTimeout(timer);
                    });

            }, 300); // TODO: interval pass as option
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

    protected getElement(selector: string, timeout: number = this.timeout): Promise<WebElement> {
        return new Promise(async (resolve) => {
            const elements: WebElement[] = await this.getElements(selector, timeout);
            resolve(elements[0]);
        });
    }

}

export = Elements;
