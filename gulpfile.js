var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var del = require('del');
 
gulp.task('ts-babel', function () {
    // Using my existing tsconfig.json file
    var tsProject = ts.createProject(__dirname + '/tsconfig.json');
 
    // The `base` part is needed so
    //  that `dest()` doesnt map folders correctly after rename
    return gulp.src('src/**/*.ts', { base: 'src' })
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

gulp.task('watch', function () {
    gulp.watch(['src/**/*.ts'], ['ts-babel'])
})

gulp.task('dev', [
    'ts-babel',
    'watch'
]);

gulp.task('default', [
    'ts-babel'
]);