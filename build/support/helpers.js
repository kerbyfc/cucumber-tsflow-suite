"use strict";
const _ = require('lodash');
function pattern(stepPatterns) {
    return new RegExp(_.reduce(stepPatterns, (complexPattern, pattern, index) => {
        complexPattern += pattern.toString().slice(1, -1)
            .replace(/^\^/, '').replace(/\$$/, '').replace(/\\/g, '\\');
        return complexPattern + (index + 1 === stepPatterns.length ? '$' : '|');
    }, '^'));
}
exports.pattern = pattern;
