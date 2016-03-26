/**
 * npm install gulpjs/gulp-cli -g
 * npm install gulpjs/gulp.git#4.0 --save-dev
 */
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    inject       = require('gulp-inject'),
    browserSync  = require('browser-sync'),
    svg          = require('gulp-svgmin'),
    svgstore     = require('gulp-svgstore'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify');

gulp.task('sass', function() {
  return gulp.src('./source/index.html')
    .pipe(inject(
      gulp.src('./source/sass/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./source/assets/css'))
    ))
    .pipe(gulp.dest('./source'));
});

gulp.task('javascript', function() {
  return gulp.src('./source/index.html')
    .pipe(inject(
      gulp.src('./source/js/**/*.js')
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./source/assets/js'))
    ))
    .pipe(gulp.dest('./source'));
});

gulp.task('svg', function() {
  return gulp.src('./source/index.html')
    .pipe(inject(gulp.src('./source/images/**/*.svg')
      .pipe(svg(function(file) {
        return {
          plugins: [{
            cleanupIDs: {
              prefix: path.basename(file.relative, path.extname(file.relative)) + '-',
              minify: true
            }
          }]
        };
      }))
      .pipe(svgstore({
        inlineSvg: true,
      })), {
        transform: function(path, file) {
          return file.contents.toString();
        }
      }
    ))
    .pipe(gulp.dest('./source'));
});

gulp.task('images', function() {
  return gulp.src('./source/images/**/*.+(png|jpeg|jpg|gif)')
    .pipe(gulp.dest('./source/assets/images'));
});

gulp.task('default', gulp.series(
    'sass',
    'javascript',
    'svg',
    'images',
    function() {
      browserSync({
        server: {
          baseDir: './source',
          notify: false
        }
      });

      gulp.watch('./source/*.html', browserSync.reload);
      gulp.watch('./source/sass/**/*.+(scss|sass)', gulp.series('sass'));
      gulp.watch('./source/js/**/*.js', gulp.series('javascript', browserSync.reload));
      gulp.watch('./source/svg/**/*.svg', gulp.series('svg', browserSync.reload));
      gulp.watch('./source/images/**/*.+(png|jpeg|jpg|gif)', gulp.series('images', browserSync.reload));
    }
  )
);
