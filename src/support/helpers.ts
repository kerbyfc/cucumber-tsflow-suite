import * as _ from 'lodash';

export function pattern(stepPatterns: RegExp[]): RegExp {
    return new RegExp(_.reduce(stepPatterns, (complexPattern, pattern, index) => {
        complexPattern += pattern.toString().slice(1, -1)
            .replace(/^\^/, '').replace(/\$$/, '').replace(/\\/g, '\\');
        return complexPattern + (index + 1 === stepPatterns.length ? '$' : '|');
    }, '^'));
}