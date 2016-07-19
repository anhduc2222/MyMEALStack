var gulp = require('gulp');
var nodeMon = require('gulp-nodemon');
var concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json');

var input = {
    'sass': 'source/scss/**/*.scss',
    'javascript': 'public/**/*.js',
    'vendorjs': 'public/assets/javascript/vendor/**/*.js'
};

var output = {
    'stylesheets': 'public/assets/stylesheets',
    'javascript': 'build/javascript'
};

gulp.task('build-js', function () {
    return gulp.src([input.javascript, '!public/lib/**'])
        .pipe(sourceMaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(output.javascript));
});

gulp.task("default", function() {
    runSequence(["compile", "watch"], "nodeMon");
});

gulp.task("compile", function () {
    return gulp
        .src("src/**/*.ts")
        .pipe(ts(tsProject))
        .pipe(gulp.dest("build"));
});

gulp.task("watch", function () {
    return gulp.watch("src/**/*.ts", ["compile"]);
});

gulp.task("nodeMon", function () {
    nodeMon({ script: "build/server.js" });
});