'use strict';

// noinspection ES6UnusedImports
import
{
    By,
    promise,
    WebElement
} from 'selenium-webdriver';

import Promise = promise.Promise;
import {binding, then} from 'cucumber-tsflow/dist/index';

import StepSet = require('../support/stepset');
import {pattern} from '../support/helpers';

/*
 * Поддержка операций с элементами
 */
@binding()
class ElementsStepSet extends StepSet {

    public static map: {} = {};

    protected get timeout(): number {
        return 5000;
    }

    protected get interval(): number {
        return 300;
    }

    @then(pattern([
        /^содержимое (.*) должно быть '([^']*)'$/
    ]))
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

    @then(pattern([
        /^(.*) долж(?:ен|на) быть пуст(?:ым|ой)$/
    ]))
    public async shouldBeEmpty(selector: string): Promise<void> {
        const html: string = await this.getElementInnerHtml(selector);
        if (html.trim() !== '') {
            throw new Error(`'${selector}' содержит '${html.slice(0, 100)}'`);
        }
    }

    @then(pattern([
        /^(.*) долж(?:ен|на) содержать (\d+) (.*)$/
    ]))
    public async checkChildrenCount(container: string, count: number, children: string): Promise<void> {
        const elements: WebElement[] = await this.getElements(`${container} > ${children}`);
        if (!elements.length) {
            throw new Error(`'${container}' не содержит ${children}`);
        }
        if (elements.length !== +count) {
            throw new Error(`'${container}' содержит ${elements.length} '${children}' а не ${count}`);
        }
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
        // selector = this.getNamedSelector(selector) || selector;

        return this.actor<WebElement[]>({
            invoke: () => this.driver.findElements(By.css(selector)),
            until: (elements: WebElement[]) => elements.length > 0,
            otherwise: () => {
                throw new Error(`Элемент(ы) '${selector}' не найден(ы) на странице`);
            },
            during: timeout,
            every: this.interval
        });
    }

    protected getElement(selector: string, timeout: number = this.timeout): Promise<WebElement> {
        return new Promise(async (resolve) => {
            const elements: WebElement[] = await this.getElements(selector, timeout);
            // TODO: warning if element if not unique
            resolve(elements[0]);
        });
    }

}

export = ElementsStepSet;
