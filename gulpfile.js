var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
 
gulp.task('ts-babel', function () {
    // Using my existing tsconfig.json file
    var tsProject = ts.createProject(__dirname + '/tsconfig.json');
 
    // The `base` part is needed so
    //  that `dest()` doesnt map folders correctly after rename
    return gulp.src('app/**/*.ts', { base: './' })
        .pipe(ts(tsProject))
        .pipe(babel({
            optional: ['runtime']
        }))
        .pipe(rename(function (path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', [
    'ts-babel'
]);