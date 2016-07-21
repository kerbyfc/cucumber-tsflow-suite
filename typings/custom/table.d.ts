
interface ITable {

    /**
     * | Cucumber     | Cucumis sativus |
     * | Burr Gherkin | Cucumis anguria |
     *
     * [
     *   ['Cucumber', 'Cucumis sativus'],
     *   ['Burr Gherkin', 'Cucumis anguria']
     * ]
     */
    raw(): Array<string[]>;


    /**
     * | Vegetable | Rating |
     * | Apricot   | 5      |
     * | Brocolli  | 2      |
     * | Cucumber  | 10     |
     *
     * [
     *   ['Apricot', '5'],
     *   ['Brocolli', '2'],
     *   ['Cucumber', '10']
     * ]
     */
    rows(): Array<string[]>;

    /*
     * | Cucumber     | Cucumis sativus |
     * | Burr Gherkin | Cucumis anguria |
     *
     * {
     *   'Cucumber': 'Cucumis sativus',
     *   'Burr Gherkin': 'Cucumis anguria'
     * }
     */
    rowsHash(): {[k: string]: string};

    /*
     * | Vegetable | Rating |
     * | Apricot   | 5      |
     * | Brocolli  | 2      |
     * | Cucumber  | 10     |
     *
     * [
     *   {'Vegetable': 'Apricot', 'Rating': '5'},
     *   {'Vegetable': 'Brocolli', 'Rating': '2'},
     *   {'Vegetable': 'Cucumber', 'Rating': '10'}
     * ]
     */
    hashes(): Array<{[k: string]: string}>;
}