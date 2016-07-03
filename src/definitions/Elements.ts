// 'use strict';
//
// import {binding, given, before, after} from 'cucumber-tsflow';
// import {Table} from '../support/Table';
//
// /**
//  * Смысл данного функционала заключается в том, чтобы
//  */
// @binding()
// class FormData {
//
//     /**
//      * Данные формы
//      */
//     protected formData: {} = {};
//
//     /**
//      * Именованные ссылки для css-селекторов элементов.
//      */
//     protected selectorsMap: {} = {};
//
//     /**
//      * Сохраненные данные формы в момент начала сценария,
//      * используемые для восстановления данных после сценария
//      */
//     protected formDataBackup: {} = {};
//
//     /**
//      * Сбразываем значения полей формы
//      * перед каждым сценарием, с тегом @resetFormData
//      * @example
//      *          @resetFormData
//      *          Сценарий: Авторизация пользователя
//      *              Дано данные формы:
//      *                  # ...
//      */
//     @before('clearFormData')
//     public clearFormData(): void {
//         this.formData = {};
//     }
//
//     /**
//      * Сбразываем поля формы
//      * перед каждым сценарием, с тегом @resetFormData
//      * @example
//      *          @clearFormSelectors
//      *          Сценарий: Авторизация пользователя
//      *              Дано поля формы:
//      *                  # ...
//      */
//     @before('clearFormSelectors')
//     public clearFormSelectors(): void {
//         this.selectorsMap = {};
//     }
//
//     /**
//      * Сохранить данные формы до начала
//      * выполнения сценария
//      */
//     @before('isolateContextFormData')
//     public backupFormData(): void {
//         this.formDataBackup = this.formData;
//     }
//
//     /**
//      * Восстановить данные формы
//      * после выполнения сценария
//      */
//     @after('isolateContextFormData')
//     public restoreFormData(): void {
//         this.formData = this.formDataBackup;
//     }
//
//     /**
//      * Регистрируем для каждого элемента формы
//      * уникальное имя
//      * @example
//      *      Дано поля формы:
//      *          | логин     | [name="USER_LOGIN"]     |
//      *          | пароль    | [name="USER_PASSWORD"]  |
//      */
//     @given(/^элементы:$/)
//     public GivenXXX (table, callback): void {
//         // Write code here that turns the phrase above into concrete actions
//         callback.pending();
//     }
//
//     /**
//      * Добавить данные формы, которые потом могу быть
//      * фактически вставлены в форму с помощью других методов
//      * @example
//      *      Дано данные формы:
//      *          | логин   | kerbyfc@gmail.com   |
//      *          | пароль  | qwe123QWE           |
//      */
//     @given(/^данные формы:$/)
//     public setFormData(table: Table): void {
//         this.formData = table.rowsHash();
//     }
//
// }
