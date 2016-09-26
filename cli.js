#! /usr/bin/env node

var cucumber = require('cucumber-templates');
var path = require('path');

const [_, __, featuresPath, ...args] = process.argv;

function patternsExtractor(content) {
    var match = content.match(/@\w+\(pattern\(\[(\W*.*)\n*\s*\]\)\)\n/g);
    if (match) {
        return match.join(' ').match(/\/\^([^\$]+)\$\//g);
    } else {
        return [];
    }
}

cucumber({
    features: path.join(process.cwd(), featuresPath),
    definitions: path.join(__dirname, './build'),
    patternFiles: path.join(__dirname, './src/**/*.ts'),
    extractor: patternsExtractor,
    args: args
});