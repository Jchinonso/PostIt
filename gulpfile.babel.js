import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('transpile', () =>
  gulp.src(['./**/*.js', '!dist/**', '!node_modules/**', '!gulpfile.babel.js'])
  .pipe(babel())
  .pipe(gulp.dest('dist'))
);

// this runs the jasmine tests through an already transpiled file
gulp.task('run-tests', ['babel'], () => {
  gulp.src(path.join('dist', 'tests', 'inverted-index-test.js'))
  .pipe(jasmine())
  .pipe(exit());
});