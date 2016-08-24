'use strict';

import 'string_score';
import * as _ from 'lodash';
import {binding, given, then} from 'cucumber-tsflow';
// noinspection ES6UnusedImports
import
{
    By,
    promise,
    WebElement
} from 'selenium-webdriver';
import StepSet = require('../support/stepset');
import Promise = promise.Promise;

/**
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

    @given(/^(?:есть )элементы:?$/)
    public setElements(table: ITable): void {
       ElementsStepSet.map = table.rowsHash();
    }

    @then([
        /^содержимое (.*) должно быть '([^']*)'$/
    ])
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

    @then([
        /^(.*) долж(?:ен|на) быть пуст(?:ым|ой)$/
    ])
    public async shouldBeEmpty(selector: string): Promise<void> {
        const html: string = await this.getElementInnerHtml(selector);
        if (html.trim() !== '') {
            throw new Error(`'${selector}' содержит '${html.slice(0, 100)}'`);
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
        selector = this.getNamedSelector(selector) || selector;

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

    protected log(...args: any[]): void {
        if (process.env.DEBUG) {
            console.log.apply(console, ['     '].concat(args));
        }
    }

    /**
     * Получить именованный селектор с помощью нечеткого поиска
     * @example
     *     ElementsStepSet.map["кнопка входа"] = ".button";
     *      this.getNamedSelector("кнопку входа") // ".button"
     */
    protected getNamedSelector(name: string): string {
        /**
         * Проверить есть ли точное совпадение
         */
        let element = ElementsStepSet.map[name];
        if (element) {
            this.log(`Use ${element}`);
            return element;
        }

        let pairs = _.toPairs(ElementsStepSet.map);

        if (!pairs.length) {
            return;
        }

        pairs = _.map(pairs, (map) => {
            const score: number = name.score(map[0], 1);
            return map.concat([score]);
        });

        pairs = _.sortBy(pairs, (map) => _.last(map)).reverse();

        let score: number = pairs[0][2];

        if (score < 0.3) {
            let error: string = `Элемент '${name}' не найден.`;
            if (process.env.DEBUG) {
                error += `Ближайшее совпадение c '${pairs[0][0]}' ${(score * 100).toFixed(2)}%`;
            }
            throw new Error(error);
        }

        if (pairs.length > 1 && score.toFixed(1) === pairs[1][2].toFixed(1)) {
            throw new Error(
                `Используемое имя элемента '${name}' неоднозначно, 
                как и ${pairs[1][0]}`
            );
        }

        this.log(`Use ${pairs[0][1]}`);
        return pairs[0][1];
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
