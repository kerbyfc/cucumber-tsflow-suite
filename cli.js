#! /usr/bin/env node

var cucumber = require('cucumber-templates');
var path = require('path');

const [_, __, featuresPath, ...args] = process.argv;

cucumber({
    features: path.join(process.cwd(), featuresPath),
    definitions: path.join(__dirname, './build'),
    args: args
});