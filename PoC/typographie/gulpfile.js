var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('js', function() {
  browserSync.reload();
});

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["scripts/*.js", "*.html", "styles/*.css"]).on("change", reload);
});
