var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
  return gulp.src('source/sass/**/*.+(scss|sass)')
    .pipe(sass())
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'source'
    }
  })
})

gulp.task('watch', function() {
  gulp.watch('source/sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch('source/*.html', browserSync.reload);
  gulp.watch('source/js/**/*.js', browserSync.reload);
})

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})
