var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var del = require('del');
var plumber = require('gulp-plumber');

var paths = {
    config: __dirname + '/tsconfig.json',
    steps: 'src/steps/*.ts',
    support: 'src/support/*.ts',
    bootstrap: 'src/index.js',
    build: 'build'
};

function compile(src, dest, typescript) {
    var task = gulp.src(src, { base: 'src' })
        .pipe(plumber());

    if (typescript) {
        task = task.pipe(ts(ts.createProject(paths.config)));
    }

    return task
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(rename(function (path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest(dest));
}

gulp.task('compile-sources', ['cleanup'], function () {
    return compile([paths.steps, paths.support], paths.build, true);
});

gulp.task('cleanup', function() {
    return del(paths.build);
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.ts'], ['compile-sources']);
});

gulp.task('dev', [
    'compile-sources',
    'watch'
]);

gulp.task('default', [
    'compile-sources'
]);