var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var del = require('del');
var plumber = require('gulp-plumber');
 
gulp.task('ts-babel', ['cleanup'], function () {
    // Using my existing tsconfig.json file
    var tsProject = ts.createProject(__dirname + '/tsconfig.json');
 
    // The `base` part is needed so
    //  that `dest()` doesnt map folders correctly after rename
    return gulp.src('src/**/*.ts', { base: 'src' })
        .pipe(plumber())
        .pipe(ts(tsProject))
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(rename(function (path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('cleanup', function() {
    return del('build');
});

gulp.task('gendoc', function() {
    var StepDictionary = require('./tools/step-dictionary');
    var dict = new StepDictionary('./src');
    dict.outputReport('steps.html');
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.ts'], ['ts-babel'])
});

gulp.task('dev', [
    'ts-babel',
    'watch'
]);

gulp.task('default', [
    'ts-babel'
]);