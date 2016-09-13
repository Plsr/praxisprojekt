var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var reload      = browserSync.reload;

gulp.task('js', function() {
  gulp.src('src/scripts/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('scripts'))
  browserSync.reload();
});

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/scripts/*.js", ['js']);
    gulp.watch(["*.html", "styles/*.css"]).on("change", reload);
});
